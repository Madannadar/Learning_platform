import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import problems from "../problems.json";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import the Navbar component

const Problem = () => {
  const { id } = useParams();
  const problemId = parseInt(id);
  const problem = problems.find((p) => p.id === problemId);

  const [code, setCode] = useState(`// Write your code here`);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [language, setLanguage] = useState("cpp");
  const [isSuccess, setIsSuccess] = useState(false);

  const languageOptions = [
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
  ];

  const languageIds = {
    cpp: 54,
    python: 71,
  };

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("");
    setIsSuccess(false);

    try {
      console.log("Submitting Code:", {
        source_code: code,
        language_id: languageIds[language],
        stdin: problem.sampleInput,
      });

      const submissionResponse = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: languageIds[language],
          stdin: problem.sampleInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "0e899c3238mshd62724b1dc37a19p18f20djsn4fbae559bf24", // Your API key
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      console.log("Submission Response:", submissionResponse.data);
      const submissionId = submissionResponse.data.token;
      console.log("Submission ID:", submissionId);

      let result;
      let attempts = 0;
      const maxAttempts = 15;
      const pollInterval = 2000;

      while (attempts < maxAttempts) {
        result = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}?base64_encoded=false&fields=*`,
          {
            headers: {
              "X-RapidAPI-Key": "0e899c3238mshd62724b1dc37a19p18f20djsn4fbae559bf24",
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        console.log("Polling Attempt:", attempts + 1, "Response:", result.data);

        if (result.data.status.id !== 1 && result.data.status.id !== 2) {
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, pollInterval));
        attempts++;
      }

      console.log("Final Judge0 API Response:", result.data);

      if (result.data.status.id === 3) {
        setOutput(result.data.stdout?.trim() || "No output");
        setIsSuccess(true);
      } else if (result.data.status.id === 6) {
        setOutput(`Compilation Error: ${result.data.compile_output?.trim()}`);
      } else if (result.data.stderr) {
        setOutput(`Runtime Error: ${result.data.stderr?.trim()}`);
      } else {
        setOutput(`Error: ${result.data.status.description}`);
      }
    } catch (error) {
      console.error("Error executing code:", error.response ? error.response.data : error.message);
      setOutput("Error executing code. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-900 font-poppins text-gray-100 p-8">
        <h1 className="text-3xl font-bold text-purple-400">Problem Not Found</h1>
        <p className="text-gray-400 mt-4">The problem you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-poppins text-gray-100">
      <Navbar />
      <div className="p-8">
        <div className="text-right mb-4">
          <p className="text-gray-400">Time Elapsed: <span className="font-bold">{formatTime(timeElapsed)}</span></p>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-purple-400">{problem.title}</h1>
        <p className="text-gray-400 mb-4">{problem.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-300">Sample Input</h2>
            <pre className="bg-gray-800 p-4 rounded-lg text-gray-400 mb-4">{problem.sampleInput}</pre>
            <h2 className="text-xl font-semibold mb-2 text-gray-300">Sample Output</h2>
            <pre className="bg-gray-800 p-4 rounded-lg text-gray-400">{problem.sampleOutput}</pre>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-300">Code Editor</h2>
            <button onClick={handleRunCode} disabled={isLoading} className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600">{isLoading ? "Running..." : "Run Code"}</button>
            <div className="mb-4">
              <label htmlFor="language" className="block text-sm font-medium text-gray-300">Select Language</label>
              <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500">
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <Editor height="400px" defaultLanguage={language} defaultValue={code} onChange={(value) => setCode(value)} theme="vs-dark" />
            </div>
            

            {output && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-300">Output</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-400">Current Output</h3>
                    <pre className="bg-gray-800 p-4 rounded-lg text-gray-400">{output}</pre>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-400">Expected Output</h3>
                    <pre className="bg-gray-800 p-4 rounded-lg text-gray-400">
                      {problem.sampleOutput}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;

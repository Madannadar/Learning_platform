import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import problems from "../problems.json";
import { useParams } from "react-router-dom";

const Problem = () => {
  const { id } = useParams(); // Get the problem ID from the URL
  const problemId = parseInt(id); // Convert ID to a number

  // Find the problem by ID
  const problem = problems.find((p) => p.id === problemId);

  // State for code, output, and execution status
  const [code, setCode] = useState(`// Write your code here`);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State for the timer
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  // State for selected language
  const [language, setLanguage] = useState("cpp"); // Default to C++

  // State to track if the code execution was successful
  const [isSuccess, setIsSuccess] = useState(false);

  // Language options
  const languageOptions = [
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
  ];

  // Language IDs for Judge0 API
  const languageIds = {
    cpp: 54, // C++ ID in Judge0
    python: 71, // Python ID in Judge0
  };

  // Start the timer when the component mounts
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Format the time elapsed into MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Handle code execution
  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("");
    setIsSuccess(false); // Reset success state

    try {
      // Step 1: Submit the code
      const submissionResponse = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          source_code: code,
          language_id: languageIds[language], // Use the selected language ID
          stdin: problem.sampleInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "0e899c3238mshd62724b1dc37a19p18f20djsn4fbae559bf24", // Replace with your RapidAPI key
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com", // Corrected host
          },
        }
      );

      const submissionId = submissionResponse.data.token;

      // Step 2: Poll for the result
      let result;
      let attempts = 0;
      const maxAttempts = 10; // Maximum number of polling attempts
      const pollInterval = 1000; // Poll every 1 second

      while (attempts < maxAttempts) {
        result = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`,
          {
            headers: {
              "X-RapidAPI-Key": "0e899c3238mshd62724b1dc37a19p18f20djsn4fbae559bf24", // Replace with your RapidAPI key
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com", // Corrected host
            },
          }
        );

        // Check if the submission is processed
        if (result.data.status.id !== 1 && result.data.status.id !== 2) {
          break; // Exit the loop if the submission is processed
        }

        // Wait before polling again
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
        attempts++;
      }

      // Log the full API response for debugging
      console.log("Judge0 API Response:", result.data);

      // Step 3: Handle the result
      if (result.data.status.id === 3) {
        // Submission was successful
        setOutput(result.data.stdout || "No output");
        setIsSuccess(true); // Set success state to true
      } else if (result.data.status.id === 6) {
        // Compilation error
        setOutput(`Compilation Error: ${result.data.compile_output}`);
      } else if (result.data.stderr) {
        // Runtime error
        setOutput(`Runtime Error: ${result.data.stderr}`);
      } else {
        // Other errors
        setOutput(`Error: ${result.data.status.description}`);
      }
    } catch (error) {
      console.error("Error executing code:", error.response ? error.response.data : error.message);
      setOutput("Error executing code. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // If the problem is not found, display an error message
  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-900 font-poppins text-gray-100 p-8">
        <h1 className="text-3xl font-bold text-purple-400">Problem Not Found</h1>
        <p className="text-gray-400 mt-4">
          The problem you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 font-poppins text-gray-100 p-8">
      {/* Timer */}
      <div className="text-right mb-4">
        <p className="text-gray-400">
          Time Elapsed: <span className="font-bold">{formatTime(timeElapsed)}</span>
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-4 text-purple-400">{problem.title}</h1>
      <p className="text-gray-400 mb-4">{problem.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Problem Details */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-300">Sample Input</h2>
          <pre className="bg-gray-800 p-4 rounded-lg text-gray-400 mb-4">
            {problem.sampleInput}
          </pre>

          <h2 className="text-xl font-semibold mb-2 text-gray-300">Sample Output</h2>
          <pre className="bg-gray-800 p-4 rounded-lg text-gray-400">
            {problem.sampleOutput}
          </pre>
        </div>

        {/* Code Editor */}
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-300">Code Editor</h2>

          {/* Language Selection Dropdown */}
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-300">
              Select Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <Editor
              height="400px"
              defaultLanguage={language === "cpp" ? "cpp" : "python"}
              defaultValue={code}
              onChange={(value) => setCode(value)}
              theme="vs-dark"
            />
          </div>

          {/* Run Button */}
          <button
            onClick={handleRunCode}
            disabled={isLoading}
            className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>

          {/* Output */}
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

          {/* Success Message */}
          {isSuccess && (
            <div className="mt-4 p-4 bg-green-500 text-white rounded-md">
              <p className="font-semibold">Success! Your code executed correctly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problem;
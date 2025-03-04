import { useState } from "react";
import problems from "../problems.json"; // Import your problems data

const Home = () => {
  // State to manage expanded/collapsed state of the Array box
  const [isArrayExpanded, setIsArrayExpanded] = useState(false);

  // State to manage expanded/collapsed state of Study Material and Problems
  const [isStudyMaterialExpanded, setIsStudyMaterialExpanded] = useState(false);
  const [isProblemsExpanded, setIsProblemsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 font-poppins text-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Coding Topics
      </h1>

      {/* Array Topic Box */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-gray-700">
        {/* Array Header */}
        <div
          className="cursor-pointer"
          onClick={() => setIsArrayExpanded(!isArrayExpanded)}
        >
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Array</h2>
        </div>

        {/* Show Study Material and Problems boxes if Array is expanded */}
        {isArrayExpanded && (
          <div className="space-y-4">
            {/* Study Material Box */}
            <div className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
              <div
                className="cursor-pointer"
                onClick={() => setIsStudyMaterialExpanded(!isStudyMaterialExpanded)}
              >
                <h3 className="text-xl font-semibold text-gray-300">Study Material</h3>
              </div>

              {/* Show Study Material content if expanded */}
              {isStudyMaterialExpanded && (
                <div className="mt-4">
                  <p className="text-gray-400 mb-4">
                    An array is a collection of items stored at contiguous memory locations. It is one of the most fundamental data structures in programming.
                  </p>
                  <ul className="list-disc list-inside text-gray-400">
                    <li>
                      <a
                        href="https://www.geeksforgeeks.org/array-data-structure/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300"
                      >
                        GeeksforGeeks - Array Data Structure
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.javatpoint.com/data-structure-array"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300"
                      >
                        JavaTpoint - Array in Data Structure
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Problems Box */}
            <div className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
              <div
                className="cursor-pointer"
                onClick={() => setIsProblemsExpanded(!isProblemsExpanded)}
              >
                <h3 className="text-xl font-semibold text-gray-300">Problems</h3>
              </div>

              {/* Show Problems content if expanded */}
              {isProblemsExpanded && (
                <div className="mt-4">
                  {/* Easy Problems */}
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-green-400">Easy</h4>
                    <ul className="list-disc list-inside text-gray-400">
                      <li>
                        <a
                          href="https://leetcode.com/problems/two-sum/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Two Sum (LeetCode)
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Best Time to Buy and Sell Stock (LeetCode)
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Medium Problems */}
                  <div className="mb-4">
                    <h4 className="text-lg font-medium text-yellow-400">Medium</h4>
                    <ul className="list-disc list-inside text-gray-400">
                      <li>
                        <a
                          href="https://leetcode.com/problems/3sum/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          3Sum (LeetCode)
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://leetcode.com/problems/container-with-most-water/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Container With Most Water (LeetCode)
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Hard Problems */}
                  <div>
                    <h4 className="text-lg font-medium text-red-400">Hard</h4>
                    <ul className="list-disc list-inside text-gray-400">
                      <li>
                        <a
                          href="https://leetcode.com/problems/trapping-rain-water/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Trapping Rain Water (LeetCode)
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://leetcode.com/problems/maximal-rectangle/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          Maximal Rectangle (LeetCode)
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Custom Problems */}
                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-purple-400">Custom Problems</h4>
                    <ul className="list-disc list-inside text-gray-400">
                      {problems.map((problem) => (
                        <li key={problem.id}>
                          <a
                            href={`/problem/${problem.id}`} // Link to the problem page
                            className="text-purple-400 hover:text-purple-300"
                          >
                            {problem.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add more topic boxes here */}
    </div>
  );
};

export default Home;
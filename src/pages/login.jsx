const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 font-poppins">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Login
        </h1>
        <form className="space-y-4">
          {/* Email/Username Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email or username"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Login
            </button>
          </div>

          {/* Link to Register Page */}
          <p className="text-center text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-purple-400 hover:text-purple-300">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
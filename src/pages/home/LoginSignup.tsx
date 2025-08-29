import  { useState } from "react";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-purple-700">{action}</h2>
          <div className="w-16 h-1.5 bg-purple-700 rounded-full mx-auto mt-2" />
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div
            className={`transition-all duration-500 ${
              action === "Sign Up"
                ? "max-h-20 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="flex items-center bg-purple-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300">
              <img src={user_icon} alt="user" className="w-6 h-6 mr-4" />
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 bg-transparent outline-none text-gray-700 text-lg placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center bg-purple-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300">
            <img src={email_icon} alt="email" className="w-6 h-6 mr-4" />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 bg-transparent outline-none text-gray-700 text-lg placeholder-gray-400"
            />
          </div>

          <div className="flex items-center bg-purple-50 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300">
            <img src={password_icon} alt="password" className="w-6 h-6 mr-4" />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 bg-transparent outline-none text-gray-700 text-lg placeholder-gray-400"
            />
          </div>
        </div>

        {/* Forgot password */}
        {action === "Login" && (
          <div className="text-sm text-gray-500 mt-3 text-right">
            Forgot Password?{" "}
            <span className="text-purple-700 hover:underline cursor-pointer">
              Reset here
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-10 gap-4">
          <button
            onClick={() => setAction("Sign Up")}
            className={`flex-1 h-12 rounded-full font-semibold text-lg transition duration-300 ${
              action === "Sign Up"
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Sign Up
          </button>

          <button
            onClick={() => setAction("Login")}
            className={`flex-1 h-12 rounded-full font-semibold text-lg transition duration-300 ${
              action === "Login"
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

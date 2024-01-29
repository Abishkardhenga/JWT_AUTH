import React from "react";

const Register = () => {
  return (
    <div className="bg-blue-500 h-screen flex justify-center items-center">
      <div className="bg-white w-1/2 p-8 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your full name"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded-md">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;

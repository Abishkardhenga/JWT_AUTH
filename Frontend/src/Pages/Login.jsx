import React, { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserInfo } from "../utilis/UseContext/UseContext";

const Login = () => {
  let api = "http://localhost:5000/api/auth/login";
  // let api = "http://localhost:8000/api/auth/login";
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let { state, dispatch } = useContext(UserInfo);

  let loginFetch = async () => {
    try {
      const { data, status } = await axios.post(
        api,
        {
          email,
          password,
        },
        {
          method: "POST",
          withCredentials: true,
        }
      );
      if (status == 201) {
        console.log("this is data", data);
        alert("successfully loggined ");
        dispatch({ type: "setUserdata", payload: data });
        navigate("/");
        alert("successfully login");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-red-500 h-screen flex justify-center items-center">
      <div className="bg-gray-200 w-1/2 p-8 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={() => {
            loginFetch();
          }}
          className="bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

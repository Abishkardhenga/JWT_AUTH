import React, { useContext, useEffect, useState } from "react";
import { UserInfo } from "../utilis/UseContext/UseContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [name, setName] = useState("");

  let api = "http://localhost:5000/api/auth/";

  useEffect(() => {
    ApiFetch();
  }, [cookies]);

  const ApiFetch = async () => {
    console.log("this is cookies", cookies);
    console.log("this is cookies", cookies.token);
    try {
      if (!cookies || !cookies.token) {
        console.log("Token not found in cookies");
        navigate("/login");
      } else {
        const data = await axios.post(
          api,
          {},
          {
            method: "POST",
            withCredentials: true,
          }
        );
        console.log("API response data:", data);
        setName(data.data.user);
      }
    } catch (error) {
      console.error("Error during API request:", error);

      // Handle different types of errors here, if needed

      navigate("/login");
    }
  };

  const handleLogout = () => {
    removeCookie("token");
  };

  return (
    <div>
      <div>Hello sir, {name} </div>
      <button
        className="bg-red-500  text-white px-5 pt-3 pb-3 "
        onClick={() => {
          handleLogout();
        }}
      >
        Logout{" "}
      </button>
    </div>
  );
};

export default Home;

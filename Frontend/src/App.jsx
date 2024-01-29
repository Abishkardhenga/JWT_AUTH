import React from "react";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
// import ProtectedRoutes from "./utilis/Protected routes/Protectedroutes";

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/" element={<Home />} />
        {/* </Route> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

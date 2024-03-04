import React from "react";

const Home = () => {
  return (
    <div className="container bg-red p-4">
      <div className="text-white">
        <p className="text-2xl font-bold">Aabiskar</p>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:underline">
              Subscribe
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              Courses
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              Blogs
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:underline">
              Login
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-4">{/* Your additional content goes here */}</div>
      <div className="mt-4">{/* Your additional content goes here */}</div>
    </div>
  );
};

export default Home;

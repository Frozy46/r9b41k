import React from "react";
import Sidebar from "../Sidebar";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">{children}<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" ><button className="btnchik" >Click on me</button></a></main>
      
    </div>
  );
};

export default Layout;
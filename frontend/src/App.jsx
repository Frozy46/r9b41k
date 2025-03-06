import ".//styles/app.scss";
import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";

const App = () => {
  return (
    <>
      <div className="container">
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </>
  );
};

export default App;

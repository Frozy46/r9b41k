import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import "./styles/app.scss";

const Layout = () => {
  return (
    <div className="app">
      {/* Верхняя часть: логотип и хедер */}
      <div className="top-bar">
        <a href="" className="logo">Логотип</a>
        <Header />
      </div>

      {/* Основной контейнер: сайдбар и контент */}
      <div className="container">
        <Sidebar />
        <main className="content">
          <Outlet /> {/* Контент страницы будет отображаться здесь */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
import React from "react";
import { useHeader } from "../Context/HeaderContext"; // Используем контекст
import "./Header.scss";

const Header = () => {
  const { headerInfo } = useHeader();

  return (
    <header className="header">
      <h1>{headerInfo.title}</h1>
      {headerInfo.extra && <div className="extra">{headerInfo.extra}</div>}
    </header>
  );
};

export default Header;
import React, { createContext, useContext, useState } from "react";

// Создаем контекст
const HeaderContext = createContext();

// Хук для удобного доступа
export const useHeader = () => useContext(HeaderContext);

// Провайдер контекста
export const HeaderProvider = ({ children }) => {
  const [headerInfo, setHeaderInfo] = useState({ title: "CRM System", extra: null });

  return (
    <HeaderContext.Provider value={{ headerInfo, setHeaderInfo }}>
      {children}
    </HeaderContext.Provider>
  );
};

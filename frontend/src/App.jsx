import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Deals from "./pages/Deals";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer/AddCustomer";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import { HeaderProvider } from "./components/Context/HeaderContext";

const App = () => {
  return (
    <HeaderProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} /> {/* Главная страница */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="deals" element={<Deals />} />
          <Route path="customers" element={<Customers />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </HeaderProvider>
  );
};

export default App;
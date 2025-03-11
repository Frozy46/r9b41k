import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import inactiveDashboard from "../../assets/dashboard.svg"; // SVG для неактивного состояния
import activeDashboard from "../../assets/dashboard-active.svg"; // SVG для активного состояния
import inactiveCustomers from "../../assets/customers.svg"; // SVG для неактивного состояния
import activeCustomers from "../../assets/customers-active.svg"; // SVG для активного состояния

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <button className="nav-btn">
                <img
                  src={inactiveDashboard}
                  alt="Dashboard Icon"
                  className="icon inactive"
                />
                <img
                  src={activeDashboard}
                  alt="Dashboard Icon"
                  className="icon active"
                />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/deals">Deals</Link>
          </li>
          <li>
            <Link to="/customers">
              {" "}
              <button className="nav-btn">
                <img
                  src={inactiveCustomers}
                  alt="Dashboard Icon"
                  className="icon inactive"
                />
                <img
                  src={activeCustomers}
                  alt="Dashboard Icon"
                  className="icon active"
                />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

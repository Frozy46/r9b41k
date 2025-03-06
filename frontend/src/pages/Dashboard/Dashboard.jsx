import inactiveIcon from "../../assets/dashboard.svg"; // SVG для неактивного состояния
import activeIcon from "../../assets/dashboard-active.svg"; // SVG для активного состояния
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <button className="dash-btn">
        <img src={inactiveIcon} alt="Dashboard Icon" className="dash-icon inactive" />
        <img src={activeIcon} alt="Dashboard Icon" className="dash-icon active" />
      </button>
    </div>
  );
};

export default Dashboard;
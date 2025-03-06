import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Deals from "./pages/Deals";
import DealDetail from "./pages/DealDetail";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    element: <Layout />, 
    children: [
      { path: "/dashboard", element: <ProtectedRoute element={<Dashboard />} /> },
      { path: "/deals", element: <ProtectedRoute element={<Deals />} /> },
      { path: "/deals/:id", element: <ProtectedRoute element={<DealDetail />} /> },
      { path: "/customers", element: <ProtectedRoute element={<Customers />} /> },
      { path: "/customers/:id", element: <ProtectedRoute element={<CustomerDetail />} /> },
      { path: "/tasks", element: <ProtectedRoute element={<Tasks />} /> },
      { path: "/calendar", element: <ProtectedRoute element={<Calendar />} /> },
      { path: "/notifications", element: <ProtectedRoute element={<Notifications />} /> },
      { path: "/settings", element: <ProtectedRoute element={<Settings />} /> },
      { path: "/profile", element: <ProtectedRoute element={<UserProfile />} /> },
    ],
  },
]);

export default router;

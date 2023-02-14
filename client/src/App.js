import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";
import NewBooking from "./pages/NewBooking";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/"
        element={
          <Sidebar>
            <NewBooking />
          </Sidebar>
        }
      />
    </Routes>
  );
};

export default App;

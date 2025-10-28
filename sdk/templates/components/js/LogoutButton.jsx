import React from "react";
import { logout } from "./sdk";

export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully");
    } catch (e) {
      console.error(e);
      alert("Logout failed");
    }
  };
  return <button onClick={handleLogout} className="px-4 py-2 bg-gray-500 text-white rounded">Logout</button>;
};

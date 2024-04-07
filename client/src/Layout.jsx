import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
function Layout() {
  return (
    <div className="flex flex-col px-6 py-4 min-h-screen">
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;

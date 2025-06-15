import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <ToastContainer position="top-right" />
      <main className="mt-0 overflow-y-hidden">
        <Outlet />
      </main>
    </>
  );
};

export default App;

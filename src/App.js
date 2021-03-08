import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AppRouter from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <AppRouter />
      </Router>
      <ToastContainer hideProgressBar />
    </div>
  );
}

export default App;

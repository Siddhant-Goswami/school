import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AppRouter from "./routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem("userDetails")
  );
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

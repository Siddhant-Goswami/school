import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AppRouter from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <AppRouter />
      </Router>
      <ToastContainer hideProgressBar />
      <Footer/>
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./routes";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2376E5",
    },
  },
});

function App() {
  useEffect(() => {
    const localStorageInterval = setInterval(setExpiryTokenToLocalStorage, 900000);

    return () => {
      clearInterval(localStorageInterval);
    };
  }, []);

  const setExpiryTokenToLocalStorage = () => {
    const fortyEightHours = 1728 * 100000;
    const now = new Date();
    const expiryTime = localStorage.getItem("expiry");
    if (!expiryTime) {
      localStorage.setItem("expiry", now.getTime() + fortyEightHours);
    } else {
      // expiring after 2 days
      if (now.getTime() >= expiryTime) {
        localStorage.clear();
        localStorage.setItem("expiry", now.getTime() + fortyEightHours);
      }
    }
  }

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Header />
        <Router>
          <AppRouter />
        </Router>
        <ToastContainer hideProgressBar />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;

import styles from "./App.module.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import React, { useContext } from "react";
import { DnsContext } from "./context/DnsContext";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Companylist from "./components/Companylist";

function App() {
  const { connected, connectWallet } = useContext(DnsContext);

  return (
    <BrowserRouter>
      <React.Fragment>
        <Navbar connected={connected} connectWallet={connectWallet} />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/company-list" element={<Companylist/>} />
          </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}
export default App;

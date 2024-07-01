import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Home from "./page/homePage";
import Dashboard from "./page/dashBoard";
import Contact from "./page/contact";
import Detail from "./page/sectionDetail";
import AddSection from "./page/addSection";
import UpdateSection from "./page/updateSection";
import ServicePage from "./page/servicePage";

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" style={{ marginLeft: "20px" }}>
            <Link
              to="/dashboard"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Dashboard
            </Link>
          </Typography>
          <Typography variant="h6" style={{ marginLeft: "20px" }}>
            <Link
              to="/contact"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Contact
            </Link>
          </Typography>
          <Typography variant="h6" style={{ marginLeft: "20px" }}>
            <Link
              to="/service"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Service
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/add" element={<AddSection />} />
        <Route path="/edit/:id" element={<UpdateSection />} />
      </Routes>
    </Router>
  );
};

export default App;

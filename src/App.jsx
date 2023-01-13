import React from "react";
import Login from "./components/Login/Login";
import Events from "./components/Events/Events";
import Signup from "./components/Signup/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./components/Upload/Upload";
import Create from "./components/Events/Create/Create";
import Event from "./components/Events/Event/Event";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/create-account" element={<Signup />}></Route>
        <Route exact path="/events" element={<Events />}></Route>
        <Route exact path="/upload" element={<Upload />}></Route>
        <Route exact path="/create" element={<Create />}></Route>
        <Route exact path="/event/:id" element={<Event />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

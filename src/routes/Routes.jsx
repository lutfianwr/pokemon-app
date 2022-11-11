import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "../pages/Detail";
import HomePage from "../pages/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:pokemon_name" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

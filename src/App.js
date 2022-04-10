import React from "react";
import {
  Box
} from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landingpage";

function App() {
  return (
    <Box minH={"100vh"} bg="#010101" color={"white"} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;

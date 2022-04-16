import React from "react";
import {
  Box
} from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import MintPostcard from "./pages/MintPostcard";

function App() {
  return (
    <Box minH={"100vh"} bg="#010101" color={"white"} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mint-postcard" element={<MintPostcard />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;

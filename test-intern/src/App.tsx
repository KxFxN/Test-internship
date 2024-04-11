import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import Create from "./page/create";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="/create/:id" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

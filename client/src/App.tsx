import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analysis" element={<Analysis />} />
    </Routes>
  );
}

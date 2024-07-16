import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;

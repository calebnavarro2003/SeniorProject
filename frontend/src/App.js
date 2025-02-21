import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Home from "./Components/Pages/Home"
import Analytics from "./Components/Analytics"
import Settings from "./Components/Pages/Settings"
import ModulePage from "./Components/Pages/ModulePage"
import ModuleDetail from "./Components/Pages/ModuleDetail"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/modules" element={<ModulePage/>}/>
        <Route path="/module/:moduleId" element={<ModuleDetail/>} /> 
      </Routes>
    </Router>
  );
}

export default App;

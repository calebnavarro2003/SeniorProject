import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Home from "./Components/Pages/Home"
import Analytics from "./Components/Analytics"
import Settings from "./Components/Pages/Settings"
import ModulePage from "./Components/Pages/ModulePage"
import ModuleDetail from "./Components/Pages/ModuleDetail"
import Sidebar from "./Components/Sidebar";

function App() {
  return (
      <Router>
        <div className="flex flex-row h-screen w-screen">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/modules" element={<ModulePage/>}/>
            <Route path="/module/:moduleId" element={<ModuleDetail/>} /> 
          </Routes>
        </div>
      </Router>
  );
}

export default App;

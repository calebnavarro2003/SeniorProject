import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home"
import Analytics from "./Components/Analytics"
import Settings from "./Components/Settings"
import ModulePage from "./Components/ModulePage"
import ModuleDetail from "./Components/ModuleDetail"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/modules" element={<ModulePage/>}/>
        <Route path="/module/:moduleId" element={<ModuleDetail/>} /> 
      </Routes>
    </Router>
  );
}

export default App;

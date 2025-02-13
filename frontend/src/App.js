import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home"
import Analytics from "./Components/Analytics"
import Settings from "./Components/Settings"
import ModulePage from "./Components/ModulePage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/home" element={<Settings/>}/>
        <Route path="/home" element={<Analytics/>}/>
        <Route path="/module/:moduleName" element={<ModulePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

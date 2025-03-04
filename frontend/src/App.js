import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Settings from "./Components/Pages/Settings"
import ModulePage from "./Components/Pages/ModulePage"
import ModuleDetail from "./Components/Pages/ModuleDetail"
import Sidebar from "./Components/Sidebar";

function App() {
  const location = useLocation();

  return (
      <div className="flex md:flex-row flex-col h-screen">
        {location.pathname !== "/" && (
          <div className='sticky top-0 z-50'>
            <Sidebar />
          </div> 
          )}
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/modules" element={<ModulePage/>}/>
            <Route path="/module/:moduleId" element={<ModuleDetail/>} />
          </Routes>
        </div>
      </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
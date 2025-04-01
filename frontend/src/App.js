import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Settings from "./Components/Pages/Settings";
import ModulePage from "./Components/Pages/ModulePage";
import ModuleDetail from "./Components/Pages/ModuleDetail";
import Sidebar from "./Components/Sidebar";
import InstructorSidebar from "./Components/Instructor/InstructorSidebar";
import InstructorDashboard from "./Components/Instructor/Pages/InstructorDashboard";
// import InstructorSettings from "./Components/Instructor/Pages/InstructorSettings";
// import InstructorModules from "./Components/Instructor/Pages/InstructorModules";
import InstructorModuleDetail from "./Components/Instructor/Pages/InstructorModulePage";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
      <div className="flex md:flex-row flex-col h-screen">
        {location.pathname !== "/" && (
          <div className='sticky top-0 z-50'>
            {isAdminRoute ? <InstructorSidebar /> : <Sidebar />}
          </div> 
        )}
        <div className="flex-1 flex flex-col">
          <Routes>
            {/* Student Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/modules" element={<ModulePage />} />
            <Route path="/module/:moduleId" element={<ModuleDetail />} />

            {/* Instructor Routes */}
            <Route path="/admin/dashboard" element={<InstructorDashboard />} />
            {/* <Route path="/admin/settings" element={<InstructorSettings />} />
            <Route path="/admin/modules" element={<InstructorModules />} /> */}
            <Route path="/admin/module/:moduleID" element={<InstructorModuleDetail />} />
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

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './Services/AuthContext';
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Settings from "./Components/Pages/Settings";
import ModulePage from "./Components/Pages/ModulePage";
import ModuleDetail from "./Components/Pages/ModuleDetail";
import Sidebar from "./Components/Sidebar";
import InstructorSidebar from "./Components/Instructor/InstructorSidebar";
import InstructorDashboard from "./Components/Instructor/Pages/InstructorDashboard";
import InstructorModules from "./Components/Instructor/Pages/InstructorModulesPage";
import InstructorModuleDetail from "./Components/Instructor/Pages/InstructorModulePage";
import InstructorQuestionDetail from "./Components/Instructor/Pages/InstructorQuestionPage";
import InstructorModuleCreator from "./Components/Instructor/Pages/InstructorModuleCreator";
import InstructorModuleEditor from "./Components/Instructor/Pages/InstructorModuleEditor";
import InstructorQuestionEditor from "./Components/Instructor/Pages/InstructorQuestionEditor";
import PrivateRoute from './Components/PrivateRoute';
import UserService from './Services/UserService';

function App() {
  const location = useLocation();
  // Get authentication state from AuthContext
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex md:flex-row flex-col h-screen">
      {isAuthenticated && location.pathname !== "/" && (
        <div className="sticky top-0 z-50">
          {isAdminRoute ? <InstructorSidebar /> : <Sidebar />}
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <Routes>
          {/* Public Route: Login */}
          <Route path="/" element={<Login />} />

          {/* Private Routes for authenticated users */}
          <Route element={<PrivateRoute requiredRole={"USER"} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/modules" element={<ModulePage />} />
            <Route path="/module/:moduleId" element={<ModuleDetail />} />
          </Route>

          {/* Admin-only private routes */}
          {
            <Route element={<PrivateRoute requiredRole="ADMIN"/>}>
              <Route path="/admin/dashboard" element={<InstructorDashboard />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/modules" element={<InstructorModules />} />
              <Route path="/admin/module/new" element={<InstructorModuleCreator />} />
              <Route path="/admin/module/:moduleID" element={<InstructorModuleDetail />} />
              <Route path="/admin/module/:moduleID/edit" element={<InstructorModuleEditor />} />
              <Route path="/admin/module/:moduleID/question/:questionID" element={<InstructorQuestionDetail />} />
              <Route path="/admin/module/:moduleID/question/:questionID/edit" element={<InstructorQuestionEditor />} />
            </Route>
          }

          {/* Optionally, catch-all redirect */}
          {
            !location.pathname.startsWith("/login/oauth2/code/google") &&
            <Route path="*" element={<Navigate to="/" replace />} />
          }
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;

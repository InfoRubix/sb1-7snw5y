import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainDashboard from './pages/MainDashboard';
import Dashboard from './pages/Dashboard';
import FileEntry from './pages/FileEntry';
import PICWorkspace from './pages/PICWorkspace';
import ExistingFiles from './pages/ExistingFiles';
import Finance from './pages/Finance';
import UserDashboard from './pages/UserDashboard';
import AgentDashboard from './pages/AgentDashboard';
import Login from './pages/Login';
import { useStore } from './store';

export default function App() {
  const { currentUser } = useStore();

  // Always render login page if no user
  if (!currentUser) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Main dashboard without sidebar
  if (window.location.pathname === '/main') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainDashboard />} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  const isReceptionist = currentUser.role === 'RECEPTION';
  const isPIC = currentUser.role === 'PIC';
  const isFinance = currentUser.role === 'FINANCE';
  const isClient = currentUser.role === 'CLIENT';
  const isAgent = currentUser.role === 'AGENT';

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <Routes>
              {isReceptionist ? (
                <>
                  <Route path="/file-entry" element={<FileEntry />} />
                  <Route path="/existing-files" element={<ExistingFiles />} />
                  <Route path="*" element={<Navigate to="/file-entry" replace />} />
                </>
              ) : isPIC ? (
                <>
                  <Route path="/pic-workspace" element={<PICWorkspace />} />
                  <Route path="*" element={<Navigate to="/pic-workspace" replace />} />
                </>
              ) : isFinance ? (
                <>
                  <Route path="/finance" element={<Finance />} />
                  <Route path="*" element={<Navigate to="/finance" replace />} />
                </>
              ) : isClient ? (
                <>
                  <Route path="/user-dashboard" element={<UserDashboard />} />
                  <Route path="*" element={<Navigate to="/user-dashboard" replace />} />
                </>
              ) : isAgent ? (
                <>
                  <Route path="/agent-dashboard" element={<AgentDashboard />} />
                  <Route path="*" element={<Navigate to="/agent-dashboard" replace />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
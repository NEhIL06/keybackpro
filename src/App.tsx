import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Toaster } from "react-hot-toast";
const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (!showAuth) {
      return (
        <LandingPage
          onSignIn={() => {
            setIsLoginMode(true);
            setShowAuth(true);
          }}
          onSignUp={() => {
            setIsLoginMode(false);
            setShowAuth(true);
          }}
        />
      );
    }

    return isLoginMode ? (
      <Login 
        onToggleMode={() => setIsLoginMode(false)}
        onBack={() => setShowAuth(false)}
      />
    ) : (
      <Register 
        onToggleMode={() => setIsLoginMode(true)}
        onBack={() => setShowAuth(false)}
      />
    );
  }

  return <Dashboard />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#f3f4f6",
            border: "1px solid #374151",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#1f2937",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#1f2937",
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
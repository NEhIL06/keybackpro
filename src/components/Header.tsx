import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">KeyBank</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User size={18} />
              <span className="font-medium">{user?.name}</span>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition duration-200"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
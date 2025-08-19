import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ApiKeyList from './ApiKeyList';
import AddApiKey from './AddApiKey';
import Header from './Header';
import { apiKeysAPI } from '../services/api';
import { Plus, Search, Filter, Key, TrendingUp, Shield, Clock } from 'lucide-react';

interface ApiKey {
  _id: string;
  name: string;
  description: string;
  category: string;
  service: string;
  createdAt: string;
  lastUsed?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<{ _id: string; count: number }[]>([]);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const response = await apiKeysAPI.getAll({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        search: searchTerm || undefined
      });
      setApiKeys(response.data.apiKeys);
    } catch (err) {
      console.error('Failed to fetch API keys', err);
      setError('Failed to fetch API keys');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await apiKeysAPI.getStats();
      setCategories(response.data.categories);
    } catch (err) {
      console.error('Failed to fetch stats', err);
      
    }
  };

  useEffect(() => {
    fetchApiKeys();
    fetchStats();
  }, [selectedCategory, searchTerm]);

  const handleApiKeyAdded = () => {
    setShowAddModal(false);
    fetchApiKeys();
    fetchStats();
  };

  const handleApiKeyDeleted = () => {
    fetchApiKeys();
    fetchStats();
  };

  const allCategories = [
    { name: 'All', icon: '🔧' },
    { name: 'Payment', icon: '💳' },
    { name: 'Social Media', icon: '📱' },
    { name: 'Cloud Services', icon: '☁️' },
    { name: 'Analytics', icon: '📊' },
    { name: 'Email', icon: '📧' },
    { name: 'SMS', icon: '💬' },
    { name: 'Database', icon: '🗄️' },
    { name: 'Other', icon: '🔗' }
  ];

  const totalApiKeys = categories.reduce((sum, cat) => sum + cat.count, 0);
  const recentlyUsedCount = apiKeys.filter(key => key.lastUsed && new Date(key.lastUsed) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-gray-600 text-lg">Manage your API keys securely in one place.</p>
              </div>
              <div className="hidden lg:flex items-center gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <Key className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{totalApiKeys}</p>
                  <p className="text-sm text-gray-600">Total Keys</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{recentlyUsedCount}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                  <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">100%</p>
                  <p className="text-sm text-gray-600">Secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600">⚠️</span>
              </div>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Sidebar */}
          <div className="xl:w-80 space-y-6">
            {/* Add API Key Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full group relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-4 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3 font-semibold text-lg">
                <Plus size={24} className="transform group-hover:rotate-90 transition-transform duration-300" />
                Add New API Key
              </div>
            </button>

            {/* Quick Stats Cards for Mobile */}
            <div className="lg:hidden grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                <Key className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xl font-bold text-gray-900">{totalApiKeys}</p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <p className="text-xl font-bold text-gray-900">{recentlyUsedCount}</p>
                <p className="text-xs text-gray-600">Active</p>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                <Shield className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                <p className="text-xl font-bold text-gray-900">100%</p>
                <p className="text-xs text-gray-600">Secure</p>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-3 text-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Filter size={16} className="text-white" />
                </div>
                Categories
              </h3>
              <div className="space-y-2">
                {allCategories.map((category) => {
                  const categoryCount = category.name === 'All' 
                    ? categories.reduce((sum, cat) => sum + cat.count, 0)
                    : categories.find(cat => cat._id === category.name)?.count || 0;
                  
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                        selectedCategory === category.name
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-semibold border border-blue-200 shadow-md transform scale-105'
                          : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-gray-800 hover:shadow-sm hover:scale-102'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full transition-colors duration-200 ${
                        selectedCategory === category.name
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}>
                        {categoryCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search your API keys..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-14 pr-6 py-4 text-lg bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500 shadow-xl hover:shadow-2xl focus:shadow-2xl"
              />
              <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
                <kbd className="hidden sm:inline-flex items-center px-3 py-1 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'All' ? 'All API Keys' : `${selectedCategory} Keys`}
                </h2>
                {searchTerm && (
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Searching for "{searchTerm}"
                  </span>
                )}
              </div>
              {!loading && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={16} />
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              )}
            </div>

            {/* API Keys List */}
            <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
              <ApiKeyList
                apiKeys={apiKeys}
                loading={loading}
                onApiKeyDeleted={handleApiKeyDeleted}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Add API Key Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative z-10">
            <AddApiKey
              onClose={() => setShowAddModal(false)}
              onApiKeyAdded={handleApiKeyAdded}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { apiKeysAPI } from '../services/api';
import { X, Key, Shield, Sparkles, Eye, EyeOff } from 'lucide-react';

interface AddApiKeyProps {
  onClose: () => void;
  onApiKeyAdded: () => void;
}

const AddApiKey: React.FC<AddApiKeyProps> = ({ onClose, onApiKeyAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    keyValue: '',
    category: 'Other',
    description: '',
    service: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showKey, setShowKey] = useState(false);

  const categories = [
    { name: 'Payment', icon: '💳', color: 'from-green-500 to-emerald-500' },
    { name: 'Social Media', icon: '📱', color: 'from-pink-500 to-rose-500' },
    { name: 'Cloud Services', icon: '☁️', color: 'from-blue-500 to-cyan-500' },
    { name: 'Analytics', icon: '📊', color: 'from-purple-500 to-violet-500' },
    { name: 'Email', icon: '📧', color: 'from-orange-500 to-amber-500' },
    { name: 'SMS', icon: '💬', color: 'from-indigo-500 to-blue-500' },
    { name: 'Database', icon: '🗄️', color: 'from-gray-500 to-slate-500' },
    { name: 'Other', icon: '🔗', color: 'from-teal-500 to-cyan-500' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiKeysAPI.create(formData);
      onApiKeyAdded();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create API key');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const selectedCategory = categories.find(cat => cat.name === formData.category) || categories[categories.length - 1];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-hidden border border-white/20 animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Add New API Key</h2>
                <p className="text-blue-100 text-sm">Securely store your API credentials</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 backdrop-blur-sm"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-20 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 left-20 w-16 h-16 bg-purple-300/20 rounded-full blur-lg"></div>
        </div>

        {/* Form */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-200px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-4 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-sm">⚠️</span>
                  </div>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Sparkles size={16} className="text-blue-500" />
                API Key Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500 hover:bg-white/80"
                placeholder="e.g., Stripe Payment Gateway"
              />
            </div>

            {/* API Key Value */}
            <div className="space-y-2">
              <label htmlFor="keyValue" className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Shield size={16} className="text-green-500" />
                API Key Value *
              </label>
              <div className="relative">
                <textarea
                  id="keyValue"
                  name="keyValue"
                  required
                  value={formData.keyValue}
                  onChange={handleChange}
                  rows={3}
                  type={showKey ? 'text' : 'password'}
                  className={`w-full px-4 py-3 pr-12 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500 hover:bg-white/80 resize-none ${!showKey ? 'font-mono text-xs' : ''}`}
                  placeholder="Paste your API key here..."
                  style={!showKey ? { WebkitTextSecurity: 'disc', fontSize: '0.875rem' } : {}}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-3 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield size={12} className="text-green-500" />
                <span>End-to-end encrypted before storage</span>
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                Category *
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 appearance-none hover:bg-white/80"
                >
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className={`w-6 h-6 bg-gradient-to-br ${selectedCategory.color} rounded-lg flex items-center justify-center text-white text-sm`}>
                    {selectedCategory.icon}
                  </div>
                </div>
              </div>
            </div>

            {/* Service Field */}
            <div className="space-y-2">
              <label htmlFor="service" className="block text-sm font-semibold text-gray-700">
                Service/Platform
              </label>
              <input
                type="text"
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500 hover:bg-white/80"
                placeholder="e.g., Stripe, OpenAI, AWS"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500 hover:bg-white/80 resize-none"
                placeholder="Optional description or usage notes..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Key size={18} />
                      Add API Key
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer with security note */}
        <div className="px-8 pb-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Shield size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-800">Secure Storage</p>
                <p className="text-xs text-green-600">Your API keys are encrypted with AES-256 encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddApiKey;
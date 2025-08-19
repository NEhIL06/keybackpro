import React, { useState } from 'react';
import { apiKeysAPI } from '../services/api';
import { Eye, Trash2, Copy, CheckCircle, Clock } from 'lucide-react';

interface ApiKey {
  _id: string;
  name: string;
  description: string;
  category: string;
  service: string;
  createdAt: string;
  lastUsed?: string;
}

interface ApiKeyListProps {
  apiKeys: ApiKey[];
  loading: boolean;
  onApiKeyDeleted: () => void;
}

const ApiKeyList: React.FC<ApiKeyListProps> = ({ apiKeys, loading, onApiKeyDeleted }) => {
  const [showKey, setShowKey] = useState<string | null>(null);
  const [keyValues, setKeyValues] = useState<{ [id: string]: string }>({});
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Payment': 'bg-green-100 text-green-800',
      'Social Media': 'bg-blue-100 text-blue-800',
      'Cloud Services': 'bg-purple-100 text-purple-800',
      'Analytics': 'bg-orange-100 text-orange-800',
      'Email': 'bg-red-100 text-red-800',
      'SMS': 'bg-yellow-100 text-yellow-800',
      'Database': 'bg-indigo-100 text-indigo-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.Other;
  };

  const handleViewKey = async (keyId: string) => {
    if (showKey === keyId) {
      setShowKey(null);
      return;
    }

    try {
      setLoadingKey(keyId);
      const response = await apiKeysAPI.getById(keyId);
      setKeyValues({ ...keyValues, [keyId]: response.data.apiKey.decryptedKey });
      setShowKey(keyId);
    } catch (error) {
      console.error('Error fetching key:', error);
    } finally {
      setLoadingKey(null);
    }
  };

  const handleCopyKey = async (keyId: string) => {
    try {
      if (!keyValues[keyId]) {
        setLoadingKey(keyId);
        const response = await apiKeysAPI.getById(keyId);
        setKeyValues({ ...keyValues, [keyId]: response.data.apiKey.decryptedKey });
        setLoadingKey(null);
      }

      await navigator.clipboard.writeText(keyValues[keyId]);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (error) {
      console.error('Error copying key:', error);
    }
  };

  const handleDeleteKey = async (keyId: string, keyName: string) => {
    if (!confirm(`Are you sure you want to delete "${keyName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await apiKeysAPI.delete(keyId);
      onApiKeyDeleted();
    } catch (error) {
      console.error('Error deleting key:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (apiKeys.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No API keys found</h3>
        <p className="text-gray-600">Get started by adding your first API key.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {apiKeys.map((apiKey) => (
        <div key={apiKey._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{apiKey.name}</h3>
              {apiKey.description && (
                <p className="text-gray-600 mb-3">{apiKey.description}</p>
              )}
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(apiKey.category)}`}>
                  {apiKey.category}
                </span>
                {apiKey.service && (
                  <span className="text-sm text-gray-500">{apiKey.service}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyKey(apiKey._id)}
                disabled={loadingKey === apiKey._id}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                title="Copy API key"
              >
                {copiedKey === apiKey._id ? (
                  <CheckCircle size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
              
              <button
                onClick={() => handleViewKey(apiKey._id)}
                disabled={loadingKey === apiKey._id}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-200"
                title="View API key"
              >
                {loadingKey === apiKey._id ? (
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Eye size={18} />
                )}
              </button>

              <button
                onClick={() => handleDeleteKey(apiKey._id, apiKey.name)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                title="Delete API key"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* Show API Key */}
          {showKey === apiKey._id && keyValues[apiKey._id] && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">API Key:</span>
                <button
                  onClick={() => handleCopyKey(apiKey._id)}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {copiedKey === apiKey._id ? (
                    <>
                      <CheckCircle size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <code className="block bg-white p-3 rounded border text-sm font-mono break-all">
                {keyValues[apiKey._id]}
              </code>
            </div>
          )}

          {/* Metadata */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>Created {formatDate(apiKey.createdAt)}</span>
              {apiKey.lastUsed && (
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  Last used {formatDate(apiKey.lastUsed)}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApiKeyList;

// SubscriptionPopup.jsx - Separate Popup Component
import React, { useState, useEffect } from 'react';
import { X, Calendar, CreditCard, CheckCircle, Clock, Edit2, Trash2 } from 'lucide-react';

const SubscriptionPopup = ({ isOpen, onClose, userId }) => {
  const [activeTab, setActiveTab] = useState('verified');
  const [subscriptions, setSubscriptions] = useState({
    verified_subscriptions: [],
    pending_subscriptions: []
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Mock data for demo
  const mockData = {
    verified_subscriptions: [
      {
        id: '1',
        plan_name: 'Premium Monthly',
        amount: 999,
        currency: 'PKR',
        status: 'completed',
        created_date: '2024-01-15T10:00:00Z',
        start_date: '2024-01-15T10:00:00Z',
        end_date: '2024-02-15T10:00:00Z',
        payment_method: 'card'
      },
      {
        id: '2',
        plan_name: 'Basic Yearly',
        amount: 5999,
        currency: 'PKR',
        status: 'verified',
        created_date: '2023-12-01T10:00:00Z',
        start_date: '2023-12-01T10:00:00Z',
        end_date: '2024-12-01T10:00:00Z',
        payment_method: 'bank'
      }
    ],
    pending_subscriptions: [
      {
        id: '3',
        plan_name: 'Premium Yearly',
        amount: 9999,
        currency: 'PKR',
        status: 'pending',
        created_date: '2024-06-10T10:00:00Z',
        actions: {
          can_edit: true,
          can_delete: true
        }
      },
      {
        id: '4',
        plan_name: 'Enterprise Monthly',
        amount: 2499,
        currency: 'PKR',
        status: 'processing',
        created_date: '2024-06-11T08:00:00Z',
        actions: {
          can_edit: true,
          can_delete: true
        }
      }
    ]
  };

  const fetchSubscriptions = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await fetch(`/api/user/${userId}/subscriptions`);
      // const data = await response.json();
      
      // Using mock data for demo
      setTimeout(() => {
        setSubscriptions(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error);
      setLoading(false);
    }
  };

  const handleEdit = async (subscriptionId, updatedData) => {
    try {
      // API call for edit
      // await fetch(`/api/user/${userId}/subscriptions/pending/${subscriptionId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedData)
      // });
      
      // Update local state
      setSubscriptions(prev => ({
        ...prev,
        pending_subscriptions: prev.pending_subscriptions.map(sub =>
          sub.id === subscriptionId ? { ...sub, ...updatedData } : sub
        )
      }));
      setEditingId(null);
    } catch (error) {
      console.error('Failed to edit subscription:', error);
    }
  };

  const handleDelete = async (subscriptionId) => {
    if (!window.confirm('Are you sure you want to delete this subscription?')) return;
    
    try {
      // API call for delete
      // await fetch(`/api/user/${userId}/subscriptions/pending/${subscriptionId}`, {
      //   method: 'DELETE'
      // });
      
      // Update local state
      setSubscriptions(prev => ({
        ...prev,
        pending_subscriptions: prev.pending_subscriptions.filter(sub => sub.id !== subscriptionId)
      }));
    } catch (error) {
      console.error('Failed to delete subscription:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount, currency = 'PKR') => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    if (isOpen && userId) {
      fetchSubscriptions();
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-800">My Subscriptions</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('verified')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'verified'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Verified Subscriptions ({subscriptions.verified_subscriptions.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'pending'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Pending Subscriptions ({subscriptions.pending_subscriptions.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading subscriptions...</span>
            </div>
          ) : (
            <>
              {/* Verified Subscriptions */}
              {activeTab === 'verified' && (
                <div className="space-y-4">
                  {subscriptions.verified_subscriptions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">No verified subscriptions found</p>
                    </div>
                  ) : (
                    subscriptions.verified_subscriptions.map((sub) => (
                      <div key={sub.id} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              {getStatusIcon(sub.status)}
                              <h3 className="font-semibold text-lg text-gray-800">{sub.plan_name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                                {sub.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                <span>{formatAmount(sub.amount, sub.currency)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(sub.start_date)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(sub.end_date)}</span>
                              </div>
                              <div>
                                <span className="capitalize">{sub.payment_method}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Pending Subscriptions */}
              {activeTab === 'pending' && (
                <div className="space-y-4">
                  {subscriptions.pending_subscriptions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">No pending subscriptions found</p>
                    </div>
                  ) : (
                    subscriptions.pending_subscriptions.map((sub) => (
                      <div key={sub.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              {getStatusIcon(sub.status)}
                              <h3 className="font-semibold text-lg text-gray-800">{sub.plan_name}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                                {sub.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                <span>{formatAmount(sub.amount, sub.currency)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Created: {formatDate(sub.created_date)}</span>
                              </div>
                            </div>
                          </div>
                          {sub.actions && (
                            <div className="flex gap-2 ml-4">
                              {sub.actions.can_edit && (
                                <button
                                  onClick={() => setEditingId(sub.id)}
                                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                  title="Edit Subscription"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                              )}
                              {sub.actions.can_delete && (
                                <button
                                  onClick={() => handleDelete(sub.id)}
                                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                  title="Delete Subscription"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>
              Total: {subscriptions.verified_subscriptions.length + subscriptions.pending_subscriptions.length} subscriptions
            </span>
            <button
              onClick={() => fetchSubscriptions()}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPopup;
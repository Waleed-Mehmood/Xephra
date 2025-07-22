// // SubscriptionPopup.jsx - Separate Popup Component
// import React, { useState, useEffect } from 'react';
// import { X, Calendar, CreditCard, CheckCircle, Clock, Edit2, Trash2 } from 'lucide-react';

// const SubscriptionPopup = ({ isOpen, onClose, userId }) => {
//   const [activeTab, setActiveTab] = useState('verified');
//   const [subscriptions, setSubscriptions] = useState({
//     verified_subscriptions: [],
//     pending_subscriptions: []
//   });
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   // Mock data for demo
//   const mockData = {
//     verified_subscriptions: [
//       {
//         id: '1',
//         plan_name: 'Premium Monthly',
//         amount: 999,
//         currency: 'PKR',
//         status: 'completed',
//         created_date: '2024-01-15T10:00:00Z',
//         start_date: '2024-01-15T10:00:00Z',
//         end_date: '2024-02-15T10:00:00Z',
//         payment_method: 'card'
//       },
//       {
//         id: '2',
//         plan_name: 'Basic Yearly',
//         amount: 5999,
//         currency: 'PKR',
//         status: 'verified',
//         created_date: '2023-12-01T10:00:00Z',
//         start_date: '2023-12-01T10:00:00Z',
//         end_date: '2024-12-01T10:00:00Z',
//         payment_method: 'bank'
//       }
//     ],
//     pending_subscriptions: [
//       {
//         id: '3',
//         plan_name: 'Premium Yearly',
//         amount: 9999,
//         currency: 'PKR',
//         status: 'pending',
//         created_date: '2024-06-10T10:00:00Z',
//         actions: {
//           can_edit: true,
//           can_delete: true
//         }
//       },
//       {
//         id: '4',
//         plan_name: 'Enterprise Monthly',
//         amount: 2499,
//         currency: 'PKR',
//         status: 'processing',
//         created_date: '2024-06-11T08:00:00Z',
//         actions: {
//           can_edit: true,
//           can_delete: true
//         }
//       }
//     ]
//   };

//   const fetchSubscriptions = async () => {
//     if (!userId) return;

//     setLoading(true);
//     try {
//       // Replace with actual API call
//       // const response = await fetch(`/api/user/${userId}/subscriptions`);
//       // const data = await response.json();

//       // Using mock data for demo
//       setTimeout(() => {
//         setSubscriptions(mockData);
//         setLoading(false);
//       }, 1000);
//     } catch (error) {
//       console.error('Failed to fetch subscriptions:', error);
//       setLoading(false);
//     }
//   };

//   const handleEdit = async (subscriptionId, updatedData) => {
//     try {
//       // API call for edit
//       // await fetch(`/api/user/${userId}/subscriptions/pending/${subscriptionId}`, {
//       //   method: 'PUT',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(updatedData)
//       // });

//       // Update local state
//       setSubscriptions(prev => ({
//         ...prev,
//         pending_subscriptions: prev.pending_subscriptions.map(sub =>
//           sub.id === subscriptionId ? { ...sub, ...updatedData } : sub
//         )
//       }));
//       setEditingId(null);
//     } catch (error) {
//       console.error('Failed to edit subscription:', error);
//     }
//   };

//   const handleDelete = async (subscriptionId) => {
//     if (!window.confirm('Are you sure you want to delete this subscription?')) return;

//     try {
//       // API call for delete
//       // await fetch(`/api/user/${userId}/subscriptions/pending/${subscriptionId}`, {
//       //   method: 'DELETE'
//       // });

//       // Update local state
//       setSubscriptions(prev => ({
//         ...prev,
//         pending_subscriptions: prev.pending_subscriptions.filter(sub => sub.id !== subscriptionId)
//       }));
//     } catch (error) {
//       console.error('Failed to delete subscription:', error);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const formatAmount = (amount, currency = 'PKR') => {
//     return `${currency} ${amount.toLocaleString()}`;
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'completed':
//       case 'verified':
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'pending':
//       case 'processing':
//         return <Clock className="w-4 h-4 text-yellow-500" />;
//       default:
//         return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'completed':
//       case 'verified':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//       case 'processing':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   useEffect(() => {
//     if (isOpen && userId) {
//       fetchSubscriptions();
//     }
//   }, [isOpen, userId]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//           <h2 className="text-2xl font-bold text-gray-800">My Subscriptions</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 bg-gray-50">
//           <button
//             onClick={() => setActiveTab('verified')}
//             className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//               activeTab === 'verified'
//                 ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//           >
//             Verified Subscriptions ({subscriptions.verified_subscriptions.length})
//           </button>
//           <button
//             onClick={() => setActiveTab('pending')}
//             className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//               activeTab === 'pending'
//                 ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//           >
//             Pending Subscriptions ({subscriptions.pending_subscriptions.length})
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//           {loading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-gray-600">Loading subscriptions...</span>
//             </div>
//           ) : (
//             <>
//               {/* Verified Subscriptions */}
//               {activeTab === 'verified' && (
//                 <div className="space-y-4">
//                   {subscriptions.verified_subscriptions.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg">No verified subscriptions found</p>
//                     </div>
//                   ) : (
//                     subscriptions.verified_subscriptions.map((sub) => (
//                       <div key={sub.id} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-3 mb-3">
//                               {getStatusIcon(sub.status)}
//                               <h3 className="font-semibold text-lg text-gray-800">{sub.plan_name}</h3>
//                               <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
//                                 {sub.status.toUpperCase()}
//                               </span>
//                             </div>
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                               <div className="flex items-center gap-2">
//                                 <CreditCard className="w-4 h-4" />
//                                 <span>{formatAmount(sub.amount, sub.currency)}</span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 <span>{formatDate(sub.start_date)}</span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 <span>{formatDate(sub.end_date)}</span>
//                               </div>
//                               <div>
//                                 <span className="capitalize">{sub.payment_method}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}

//               {/* Pending Subscriptions */}
//               {activeTab === 'pending' && (
//                 <div className="space-y-4">
//                   {subscriptions.pending_subscriptions.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg">No pending subscriptions found</p>
//                     </div>
//                   ) : (
//                     subscriptions.pending_subscriptions.map((sub) => (
//                       <div key={sub.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 hover:shadow-md transition-shadow">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-3 mb-3">
//                               {getStatusIcon(sub.status)}
//                               <h3 className="font-semibold text-lg text-gray-800">{sub.plan_name}</h3>
//                               <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
//                                 {sub.status.toUpperCase()}
//                               </span>
//                             </div>
//                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                               <div className="flex items-center gap-2">
//                                 <CreditCard className="w-4 h-4" />
//                                 <span>{formatAmount(sub.amount, sub.currency)}</span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 <span>Created: {formatDate(sub.created_date)}</span>
//                               </div>
//                             </div>
//                           </div>
//                           {sub.actions && (
//                             <div className="flex gap-2 ml-4">
//                               {sub.actions.can_edit && (
//                                 <button
//                                   onClick={() => setEditingId(sub.id)}
//                                   className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
//                                   title="Edit Subscription"
//                                 >
//                                   <Edit2 className="w-4 h-4" />
//                                 </button>
//                               )}
//                               {sub.actions.can_delete && (
//                                 <button
//                                   onClick={() => handleDelete(sub.id)}
//                                   className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                                   title="Delete Subscription"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-4 bg-gray-50">
//           <div className="flex justify-between items-center text-sm text-gray-600">
//             <span>
//               Total: {subscriptions.verified_subscriptions.length + subscriptions.pending_subscriptions.length} subscriptions
//             </span>
//             <button
//               onClick={() => fetchSubscriptions()}
//               className="text-blue-600 hover:text-blue-800 font-medium"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPopup;

// import React, { useState, useEffect } from 'react';
// import { X, Calendar, CreditCard, CheckCircle, Clock, Edit2, Trash2, AlertCircle, History } from 'lucide-react';

// const SubscriptionPopup = ({ isOpen, onClose, userId }) => {
//   const [activeTab, setActiveTab] = useState('current');
//   const [subscriptions, setSubscriptions] = useState({
//     current_subscription: null,
//     expired_subscriptions: [],
//     pending_subscriptions: []
//   });
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   // Mock data for demo - updated according to new business logic
//   const mockData = {
//     current_subscription: {
//       id: '1',
//       plan_name: 'Premium Monthly',
//       amount: 999,
//       currency: 'PKR',
//       status: 'verified',
//       created_date: '2024-01-15T10:00:00Z',
//       subscriptionStartDate: '2024-01-15T10:00:00Z',
//       subscriptionEndDate: '2024-02-15T10:00:00Z',
//       payment_method: 'card',
//       verificationDate: '2024-01-15T12:00:00Z',
//       isActive: true
//     },
//     expired_subscriptions: [
//       {
//         id: '2',
//         plan_name: 'Basic Yearly',
//         amount: 5999,
//         currency: 'PKR',
//         status: 'expired',
//         created_date: '2023-01-01T10:00:00Z',
//         subscriptionStartDate: '2023-01-01T10:00:00Z',
//         subscriptionEndDate: '2023-12-31T23:59:59Z',
//         payment_method: 'bank',
//         verificationDate: '2023-01-01T12:00:00Z',
//         expiryDate: '2023-12-31T23:59:59Z',
//         isActive: false
//       },
//       {
//         id: '5',
//         plan_name: 'Premium Monthly',
//         amount: 899,
//         currency: 'PKR',
//         status: 'expired',
//         created_date: '2023-12-01T10:00:00Z',
//         subscriptionStartDate: '2023-12-01T10:00:00Z',
//         subscriptionEndDate: '2023-12-31T23:59:59Z',
//         payment_method: 'card',
//         verificationDate: '2023-12-01T12:00:00Z',
//         expiryDate: '2023-12-31T23:59:59Z',
//         isActive: false
//       }
//     ],
//     pending_subscriptions: [
//       {
//         id: '3',
//         plan_name: 'Premium Yearly',
//         amount: 9999,
//         currency: 'PKR',
//         status: 'pending',
//         submissionDate: '2024-06-10T10:00:00Z',
//         actions: {
//           can_edit: true,
//           can_delete: true
//         }
//       },
//       {
//         id: '4',
//         plan_name: 'Enterprise Monthly',
//         amount: 2499,
//         currency: 'PKR',
//         status: 'rejected',
//         submissionDate: '2024-06-05T08:00:00Z',
//         rejectionReason: 'Payment verification failed. Please resubmit with valid payment proof.',
//         actions: {
//           can_edit: true,
//           can_delete: true
//         }
//       }
//     ]
//   };

//   const fetchSubscriptions = async () => {
//     if (!userId) return;

//     setLoading(true);
//     try {
//       // Replace with actual API call
//       // const response = await fetch(`/api/user/${userId}/subscriptions`);
//       // const data = await response.json();

//       // Using mock data for demo
//       setTimeout(() => {
//         setSubscriptions(mockData);
//         setLoading(false);
//       }, 1000);
//     } catch (error) {
//       console.error('Failed to fetch subscriptions:', error);
//       setLoading(false);
//     }
//   };

//   const handleEdit = async (subscriptionId, updatedData) => {
//     try {
//       // API call for edit
//       // await fetch(`/api/user/${userId}/subscriptions/pending/${subscriptionId}`, {
//       //   method: 'PUT',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(updatedData)
//       // });

//       // Update local state
//       setSubscriptions(prev => ({
//         ...prev,
//         pending_subscriptions: prev.pending_subscriptions.map(sub =>
//           sub.id === subscriptionId ? { ...sub, ...updatedData } : sub
//         )
//       }));
//       setEditingId(null);
//     } catch (error) {
//       console.error('Failed to edit subscription:', error);
//     }
//   };

//   const handleDelete = async (subscriptionId) => {
//     if (!window.confirm('Are you sure you want to delete this subscription request?')) return;

//     try {
//       // API call for delete
//       // await fetch(`/api/user/${userId}/subscriptions/pending/${subscriptionId}`, {
//       //   method: 'DELETE'
//       // });

//       // Update local state
//       setSubscriptions(prev => ({
//         ...prev,
//         pending_subscriptions: prev.pending_subscriptions.filter(sub => sub.id !== subscriptionId)
//       }));
//     } catch (error) {
//       console.error('Failed to delete subscription:', error);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const formatAmount = (amount, currency = 'PKR') => {
//     return `${currency} ${amount.toLocaleString()}`;
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'verified':
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'expired':
//         return <History className="w-4 h-4 text-gray-500" />;
//       case 'pending':
//         return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'rejected':
//         return <AlertCircle className="w-4 h-4 text-red-500" />;
//       default:
//         return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'verified':
//         return 'bg-green-100 text-green-800';
//       case 'expired':
//         return 'bg-gray-100 text-gray-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'rejected':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getDaysRemaining = (endDate) => {
//     const now = new Date();
//     const end = new Date(endDate);
//     const diffTime = end - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   useEffect(() => {
//     if (isOpen && userId) {
//       fetchSubscriptions();
//     }
//   }, [isOpen, userId]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
//           <h2 className="text-2xl font-bold text-gray-800">My Subscriptions</h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 bg-gray-50">
//           <button
//             onClick={() => setActiveTab('current')}
//             className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//               activeTab === 'current'
//                 ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//           >
//             Current Plan {subscriptions.current_subscription ? '(1)' : '(0)'}
//           </button>
//           <button
//             onClick={() => setActiveTab('history')}
//             className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//               activeTab === 'history'
//                 ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//           >
//             History ({subscriptions.expired_subscriptions.length})
//           </button>
//           <button
//             onClick={() => setActiveTab('pending')}
//             className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//               activeTab === 'pending'
//                 ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-600 hover:text-gray-800'
//             }`}
//           >
//             Pending ({subscriptions.pending_subscriptions.length})
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//           {loading ? (
//             <div className="flex items-center justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-gray-600">Loading subscriptions...</span>
//             </div>
//           ) : (
//             <>
//               {/* Current Subscription */}
//               {activeTab === 'current' && (
//                 <div className="space-y-4">
//                   {!subscriptions.current_subscription ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Active Subscription</p>
//                       <p className="text-sm mt-2">You currently don't have any active subscription plan.</p>
//                     </div>
//                   ) : (
//                     <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             {getStatusIcon(subscriptions.current_subscription.status)}
//                             <h3 className="font-semibold text-lg text-gray-800">{subscriptions.current_subscription.plan_name}</h3>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(subscriptions.current_subscription.status)}`}>
//                               ACTIVE
//                             </span>
//                           </div>

//                           {/* Days remaining indicator */}
//                           {subscriptions.current_subscription.subscriptionEndDate && (
//                             <div className="mb-4">
//                               {(() => {
//                                 const daysLeft = getDaysRemaining(subscriptions.current_subscription.subscriptionEndDate);
//                                 return (
//                                   <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
//                                     daysLeft <= 7 ? 'bg-red-100 text-red-800' :
//                                     daysLeft <= 30 ? 'bg-yellow-100 text-yellow-800' :
//                                     'bg-blue-100 text-blue-800'
//                                   }`}>
//                                     <Calendar className="w-4 h-4" />
//                                     {daysLeft > 0 ? `${daysLeft} days remaining` : 'Expired'}
//                                   </div>
//                                 );
//                               })()}
//                             </div>
//                           )}

//                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                             <div className="flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" />
//                               <span>{formatAmount(subscriptions.current_subscription.amount, subscriptions.current_subscription.currency)}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               <span>Started: {formatDate(subscriptions.current_subscription.subscriptionStartDate)}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               <span>Expires: {formatDate(subscriptions.current_subscription.subscriptionEndDate)}</span>
//                             </div>
//                             <div>
//                               <span className="capitalize">{subscriptions.current_subscription.payment_method}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* History/Expired Subscriptions */}
//               {activeTab === 'history' && (
//                 <div className="space-y-4">
//                   {subscriptions.expired_subscriptions.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Subscription History</p>
//                       <p className="text-sm mt-2">Your past subscriptions will appear here.</p>
//                     </div>
//                   ) : (
//                     subscriptions.expired_subscriptions.map((sub) => (
//                       <div key={sub.id} className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-3 mb-3">
//                               {getStatusIcon(sub.status)}
//                               <h3 className="font-semibold text-lg text-gray-800">{sub.plan_name}</h3>
//                               <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
//                                 EXPIRED
//                               </span>
//                             </div>
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                               <div className="flex items-center gap-2">
//                                 <CreditCard className="w-4 h-4" />
//                                 <span>{formatAmount(sub.amount, sub.currency)}</span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 <span>Started: {formatDate(sub.subscriptionStartDate)}</span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 <span>Expired: {formatDate(sub.subscriptionEndDate)}</span>
//                               </div>
//                               <div>
//                                 <span className="capitalize">{sub.payment_method}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}

//               {/* Pending Subscriptions */}
//               {activeTab === 'pending' && (
//                 <div className="space-y-4">
//                   {subscriptions.pending_subscriptions.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Pending Requests</p>
//                       <p className="text-sm mt-2">Your subscription requests will appear here.</p>
//                     </div>
//                   ) : (
//                     subscriptions.pending_subscriptions.map((sub) => (
//                       <div key={sub.id} className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
//                         sub.status === 'rejected' ?
//                         'bg-gradient-to-br from-red-50 to-pink-50 border-red-200' :
//                         'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
//                       }`}>
//                         <div className="flex items-start justify-between">
//                           <div className="flex-1">
//                             <div className="flex items-center gap-3 mb-3">
//                               {getStatusIcon(sub.status)}
//                               <h3 className="font-semibold text-lg text-gray-800">{sub.plan_name}</h3>
//                               <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
//                                 {sub.status.toUpperCase()}
//                               </span>
//                             </div>

//                             {/* Rejection reason */}
//                             {sub.status === 'rejected' && sub.rejectionReason && (
//                               <div className="mb-3 p-3 bg-red-100 border border-red-200 rounded-lg">
//                                 <p className="text-sm text-red-800 font-medium mb-1">Rejection Reason:</p>
//                                 <p className="text-sm text-red-700">{sub.rejectionReason}</p>
//                               </div>
//                             )}

//                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                               <div className="flex items-center gap-2">
//                                 <CreditCard className="w-4 h-4" />
//                                 <span>{formatAmount(sub.amount, sub.currency)}</span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 <span>Submitted: {formatDate(sub.submissionDate)}</span>
//                               </div>
//                             </div>
//                           </div>
//                           {sub.actions && (
//                             <div className="flex gap-2 ml-4">
//                               {sub.actions.can_edit && (
//                                 <button
//                                   onClick={() => setEditingId(sub.id)}
//                                   className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
//                                   title="Edit Subscription"
//                                 >
//                                   <Edit2 className="w-4 h-4" />
//                                 </button>
//                               )}
//                               {sub.actions.can_delete && (
//                                 <button
//                                   onClick={() => handleDelete(sub.id)}
//                                   className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                                   title="Delete Subscription"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-4 bg-gray-50">
//           <div className="flex justify-between items-center text-sm text-gray-600">
//             <span>
//               Current: {subscriptions.current_subscription ? '1' : '0'} |
//               History: {subscriptions.expired_subscriptions.length} |
//               Pending: {subscriptions.pending_subscriptions.length}
//             </span>
//             <button
//               onClick={() => fetchSubscriptions()}
//               className="text-blue-600 hover:text-blue-800 font-medium"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPopup;

// import React, { useState, useEffect } from 'react';
// import {
//   X, Calendar, CreditCard, CheckCircle, Clock, Edit2, Trash2, AlertCircle, History
// } from 'lucide-react';

// const SubscriptionPopup = ({ isOpen, onClose, userId }) => {
//   const [activeTab, setActiveTab] = useState('current');
//   const [subscriptions, setSubscriptions] = useState({
//     current_subscription: null,
//     expired_subscriptions: [],
//     pending_requests: [],
//     rejected_requests: []
//   });
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const mockData = {
//     current_subscription: {
//       id: '1',
//       plan_name: 'Premium Monthly',
//       amount: 999,
//       currency: 'PKR',
//       status: 'verified',
//       created_date: '2024-01-15T10:00:00Z',
//       subscriptionStartDate: '2024-01-15T10:00:00Z',
//       subscriptionEndDate: '2024-02-15T10:00:00Z',
//       payment_method: 'card',
//       verificationDate: '2024-01-15T12:00:00Z',
//       isActive: true
//     },
//     expired_subscriptions: [
//       {
//         id: '2',
//         plan_name: 'Basic Yearly',
//         amount: 5999,
//         currency: 'PKR',
//         status: 'expired',
//         created_date: '2023-01-01T10:00:00Z',
//         subscriptionStartDate: '2023-01-01T10:00:00Z',
//         subscriptionEndDate: '2023-12-31T23:59:59Z',
//         payment_method: 'bank',
//         verificationDate: '2023-01-01T12:00:00Z',
//         expiryDate: '2023-12-31T23:59:59Z',
//         isActive: false
//       },
//       {
//         id: '5',
//         plan_name: 'Premium Monthly',
//         amount: 899,
//         currency: 'PKR',
//         status: 'expired',
//         created_date: '2023-12-01T10:00:00Z',
//         subscriptionStartDate: '2023-12-01T10:00:00Z',
//         subscriptionEndDate: '2023-12-31T23:59:59Z',
//         payment_method: 'card',
//         verificationDate: '2023-12-01T12:00:00Z',
//         expiryDate: '2023-12-31T23:59:59Z',
//         isActive: false
//       }
//     ],
//     pending_subscriptions: [
//       {
//         id: '3',
//         plan_name: 'Premium Yearly',
//         amount: 9999,
//         currency: 'PKR',
//         status: 'pending',
//         submissionDate: '2024-06-10T10:00:00Z',
//         actions: { can_edit: true, can_delete: true }
//       },
//       {
//         id: '4',
//         plan_name: 'Enterprise Monthly',
//         amount: 2499,
//         currency: 'PKR',
//         status: 'rejected',
//         submissionDate: '2024-06-05T08:00:00Z',
//         rejectionReason: 'Payment verification failed. Please resubmit with valid payment proof.',
//         actions: { can_edit: true, can_delete: true }
//       }
//     ]
//   };

//   const fetchSubscriptions = async () => {
//     if (!userId) return;
//     setLoading(true);
//     try {
//       // Replace with actual API call
//       // const response = await fetch(`/api/user/${userId}/subscriptions`);
//       // const data = await response.json();

//       setTimeout(() => {
//         const pending = mockData.pending_subscriptions.filter(sub => sub.status === 'pending');
//         const rejected = mockData.pending_subscriptions.filter(sub => sub.status === 'rejected');

//         setSubscriptions({
//           current_subscription: mockData.current_subscription,
//           expired_subscriptions: mockData.expired_subscriptions,
//           pending_requests: pending,
//           rejected_requests: rejected
//         });
//         setLoading(false);
//       }, 1000);
//     } catch (error) {
//       console.error('Failed to fetch subscriptions:', error);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (subscriptionId) => {
//     if (!window.confirm('Are you sure you want to delete this subscription request?')) return;
//     try {
//       setSubscriptions(prev => ({
//         ...prev,
//         pending_requests: prev.pending_requests.filter(sub => sub.id !== subscriptionId),
//         rejected_requests: prev.rejected_requests.filter(sub => sub.id !== subscriptionId)
//       }));
//     } catch (error) {
//       console.error('Failed to delete subscription:', error);
//     }
//   };

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'short', day: 'numeric'
//   });

//   const formatAmount = (amount, currency = 'PKR') => `${currency} ${amount.toLocaleString()}`;

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'expired': return <History className="w-4 h-4 text-gray-500" />;
//       case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
//       default: return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'verified': return 'bg-green-100 text-green-800';
//       case 'expired': return 'bg-gray-100 text-gray-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getDaysRemaining = (endDate) => {
//     const now = new Date();
//     const end = new Date(endDate);
//     const diffTime = end - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   useEffect(() => {
//     if (isOpen && userId) fetchSubscriptions();
//   }, [isOpen, userId]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//         <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//           <h2 className="text-2xl font-bold text-gray-800">My Subscriptions</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b bg-gray-50">
//           {['current', 'history', 'pending', 'rejected'].map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//                 activeTab === tab
//                   ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               {tab === 'current' && `Current Plan (${subscriptions.current_subscription ? 1 : 0})`}
//               {tab === 'history' && `History (${subscriptions.expired_subscriptions.length})`}
//               {tab === 'pending' && `Pending (${subscriptions.pending_requests.length})`}
//               {tab === 'rejected' && `Rejected (${subscriptions.rejected_requests.length})`}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-gray-600">Loading subscriptions...</span>
//             </div>
//           ) : (
//             <>
//               {activeTab === 'current' && (
//                 subscriptions.current_subscription ? (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('verified')}
//                           <h3 className="font-semibold text-lg text-gray-800">{subscriptions.current_subscription.plan_name}</h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ACTIVE</span>
//                         </div>
//                         <div className="mb-4">
//                           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                             <Calendar className="w-4 h-4" />
//                             {getDaysRemaining(subscriptions.current_subscription.subscriptionEndDate)} days remaining
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2"><CreditCard className="w-4 h-4" />{formatAmount(subscriptions.current_subscription.amount)}</div>
//                           <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Started: {formatDate(subscriptions.current_subscription.subscriptionStartDate)}</div>
//                           <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Expires: {formatDate(subscriptions.current_subscription.subscriptionEndDate)}</div>
//                           <div>{subscriptions.current_subscription.payment_method}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12 text-gray-500">
//                     <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium">No Active Subscription</p>
//                     <p className="text-sm mt-2">You currently don't have any active subscription plan.</p>
//                   </div>
//                 )
//               )}

//               {['pending', 'rejected'].includes(activeTab) && (
//                 <div className="space-y-4">
//                   {(activeTab === 'pending' ? subscriptions.pending_requests : subscriptions.rejected_requests).map((sub) => (
//                     <div key={sub.id} className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
//                       sub.status === 'rejected'
//                         ? 'bg-red-50 border-red-200'
//                         : 'bg-yellow-50 border-yellow-200'
//                     }`}>
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             {getStatusIcon(sub.status)}
//                             <h3 className="font-semibold text-lg text-gray-800">{sub.plan_name}</h3>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
//                               {sub.status.toUpperCase()}
//                             </span>
//                           </div>
//                           {sub.status === 'rejected' && (
//                             <div className="mb-3 p-3 bg-red-100 border border-red-200 rounded-lg">
//                               <p className="text-sm text-red-800 font-medium mb-1">Rejection Reason:</p>
//                               <p className="text-sm text-red-700">{sub.rejectionReason}</p>
//                             </div>
//                           )}
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                             <div className="flex items-center gap-2"><CreditCard className="w-4 h-4" />{formatAmount(sub.amount)}</div>
//                             <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Submitted: {formatDate(sub.submissionDate)}</div>
//                           </div>
//                         </div>
//                         {sub.actions && (
//                           <div className="flex gap-2 ml-4">
//                             {sub.actions.can_edit && (
//                               <button
//                                 onClick={() => setEditingId(sub.id)}
//                                 className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
//                                 title="Edit"
//                               >
//                                 <Edit2 className="w-4 h-4" />
//                               </button>
//                             )}
//                             {sub.actions.can_delete && (
//                               <button
//                                 onClick={() => handleDelete(sub.id)}
//                                 className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
//                                 title="Delete"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                   {(activeTab === 'pending' && subscriptions.pending_requests.length === 0) ||
//                   (activeTab === 'rejected' && subscriptions.rejected_requests.length === 0) ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No {activeTab === 'pending' ? 'Pending' : 'Rejected'} Requests</p>
//                       <p className="text-sm mt-2">Your {activeTab} subscriptions will appear here.</p>
//                     </div>
//                   ) : null}
//                 </div>
//               )}

//               {activeTab === 'history' && (
//                 <div className="space-y-4">
//                   {subscriptions.expired_subscriptions.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Subscription History</p>
//                       <p className="text-sm mt-2">Your past subscriptions will appear here.</p>
//                     </div>
//                   ) : (
//                     subscriptions.expired_subscriptions.map((sub) => (
//                       <div key={sub.id} className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('expired')}
//                           <h3 className="font-semibold text-lg text-gray-800">{sub.plan_name}</h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">EXPIRED</span>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2"><CreditCard className="w-4 h-4" />{formatAmount(sub.amount)}</div>
//                           <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Started: {formatDate(sub.subscriptionStartDate)}</div>
//                           <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Expired: {formatDate(sub.subscriptionEndDate)}</div>
//                           <div>{sub.payment_method}</div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-4 bg-gray-50 text-sm text-gray-600 flex justify-between">
//           <span>
//             Current: {subscriptions.current_subscription ? '1' : '0'} |
//             History: {subscriptions.expired_subscriptions.length} |
//             Pending: {subscriptions.pending_requests.length} |
//             Rejected: {subscriptions.rejected_requests.length}
//           </span>
//           <button onClick={fetchSubscriptions} className="text-blue-600 hover:text-blue-800 font-medium">
//             Refresh
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPopup;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   X, Calendar, CreditCard, CheckCircle, Clock, Edit2, Trash2, AlertCircle, History
// } from 'lucide-react';
// import { getCategorizedUserSubscriptions } from '../../../redux/features/paymentSlice'; // Update path as needed

// const SubscriptionPopup = ({ isOpen, onClose, userId }) => {
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState('current');
//   const [editingId, setEditingId] = useState(null);

//   // Redux state
//   const {
//     categorizedSubscriptions,
//     loading,
//     error
//   } = useSelector((state) => state.payment); // Adjust 'payment' to your slice name

//   // Destructure categorized subscriptions with fallbacks
//   const {
//     active = [],
//     expired = [],
//     pending = [],
//     rejected = [],
//     total = 0
//   } = categorizedSubscriptions;

//   // Get current active subscription (first active one)
//   const currentSubscription = active.length > 0 ? active[0] : null;

//   const fetchSubscriptions = async () => {
//     if (!userId) return;
//     dispatch(getCategorizedUserSubscriptions(userId));
//   };

//   const handleDelete = async (subscriptionId) => {
//     if (!window.confirm('Are you sure you want to delete this subscription request?')) return;
//     try {
//       // Add your delete API call here
//       // await deleteSubscription(subscriptionId);
//       // Then refetch data
//       fetchSubscriptions();
//     } catch (error) {
//       console.error('Failed to delete subscription:', error);
//     }
//   };

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'short', day: 'numeric'
//   });

//   const formatAmount = (amount, currency = 'PKR') => `${currency} ${amount.toLocaleString()}`;

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'expired': return <History className="w-4 h-4 text-gray-500" />;
//       case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
//       default: return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified': return 'bg-green-100 text-green-800';
//       case 'expired': return 'bg-gray-100 text-gray-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getDaysRemaining = (endDate) => {
//     const now = new Date();
//     const end = new Date(endDate);
//     const diffTime = end - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   useEffect(() => {
//     if (isOpen && userId) {
//       fetchSubscriptions();
//     }
//   }, [isOpen, userId]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//         <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//           <h2 className="text-2xl font-bold text-gray-800">My Subscriptions</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b bg-gray-50">
//           {['current', 'history', 'pending', 'rejected'].map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//                 activeTab === tab
//                   ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               {tab === 'current' && `Current Plan (${active.length})`}
//               {tab === 'history' && `History (${expired.length})`}
//               {tab === 'pending' && `Pending (${pending.length})`}
//               {tab === 'rejected' && `Rejected (${rejected.length})`}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-gray-600">Loading subscriptions...</span>
//             </div>
//           ) : error ? (
//             <div className="text-center py-12 text-red-500">
//               <AlertCircle className="w-12 h-12 mx-auto mb-4" />
//               <p className="text-lg font-medium">Error Loading Subscriptions</p>
//               <p className="text-sm mt-2">{error}</p>
//               <button
//                 onClick={fetchSubscriptions}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : (
//             <>
//               {activeTab === 'current' && (
//                 currentSubscription ? (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('active')}
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {currentSubscription.planName || currentSubscription.plan_name}
//                           </h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">ACTIVE</span>
//                         </div>
//                         {currentSubscription.endDate && (
//                           <div className="mb-4">
//                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                               <Calendar className="w-4 h-4" />
//                               {getDaysRemaining(currentSubscription.endDate)} days remaining
//                             </div>
//                           </div>
//                         )}
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4" />
//                             {formatAmount(currentSubscription.amount, currentSubscription.currency)}
//                           </div>
//                           {currentSubscription.startDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Started: {formatDate(currentSubscription.startDate)}
//                             </div>
//                           )}
//                           {currentSubscription.endDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Expires: {formatDate(currentSubscription.endDate)}
//                             </div>
//                           )}
//                           <div>{currentSubscription.paymentMethod || currentSubscription.payment_method}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12 text-gray-500">
//                     <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium">No Active Subscription</p>
//                     <p className="text-sm mt-2">You currently don't have any active subscription plan.</p>
//                   </div>
//                 )
//               )}

//               {['pending', 'rejected'].includes(activeTab) && (
//                 <div className="space-y-4">
//                   {(activeTab === 'pending' ? pending : rejected).map((sub) => (
//                     <div key={sub.id} className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
//                       sub.status === 'rejected'
//                         ? 'bg-red-50 border-red-200'
//                         : 'bg-yellow-50 border-yellow-200'
//                     }`}>
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             {getStatusIcon(sub.status)}
//                             <h3 className="font-semibold text-lg text-gray-800">
//                               {sub.planName || sub.plan_name}
//                             </h3>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
//                               {sub.status.toUpperCase()}
//                             </span>
//                           </div>
//                           {sub.status === 'rejected' && sub.rejectionReason && (
//                             <div className="mb-3 p-3 bg-red-100 border border-red-200 rounded-lg">
//                               <p className="text-sm text-red-800 font-medium mb-1">Rejection Reason:</p>
//                               <p className="text-sm text-red-700">{sub.rejectionReason}</p>
//                             </div>
//                           )}
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                             <div className="flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" />
//                               {formatAmount(sub.amount, sub.currency)}
//                             </div>
//                             {(sub.submissionDate || sub.createdAt) && (
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 Submitted: {formatDate(sub.submissionDate || sub.createdAt)}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                         <div className="flex gap-2 ml-4">
//                           <button
//                             onClick={() => setEditingId(sub.id)}
//                             className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
//                             title="Edit"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(sub.id)}
//                             className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {((activeTab === 'pending' && pending.length === 0) ||
//                     (activeTab === 'rejected' && rejected.length === 0)) && (
//                     <div className="text-center py-12 text-gray-500">
//                       <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No {activeTab === 'pending' ? 'Pending' : 'Rejected'} Requests</p>
//                       <p className="text-sm mt-2">Your {activeTab} subscriptions will appear here.</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'history' && (
//                 <div className="space-y-4">
//                   {expired.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Subscription History</p>
//                       <p className="text-sm mt-2">Your past subscriptions will appear here.</p>
//                     </div>
//                   ) : (
//                     expired.map((sub) => (
//                       <div key={sub.id} className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('expired')}
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {sub.planName || sub.plan_name}
//                           </h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">EXPIRED</span>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4" />
//                             {formatAmount(sub.amount, sub.currency)}
//                           </div>
//                           {sub.startDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Started: {formatDate(sub.startDate)}
//                             </div>
//                           )}
//                           {sub.endDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Expired: {formatDate(sub.endDate)}
//                             </div>
//                           )}
//                           <div>{sub.paymentMethod || sub.payment_method}</div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-4 bg-gray-50 text-sm text-gray-600 flex justify-between">
//           <span>
//             Current: {active.length} |
//             History: {expired.length} |
//             Pending: {pending.length} |
//             Rejected: {rejected.length} |
//             Total: {total}
//           </span>
//           <button onClick={fetchSubscriptions} className="text-blue-600 hover:text-blue-800 font-medium">
//             Refresh
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPopup;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   X, Calendar, CreditCard, CheckCircle, Clock, Edit2, Trash2, AlertCircle, History
// } from 'lucide-react';
// import { getCategorizedUserSubscriptions } from '../../../redux/features/paymentSlice'; // Update path as needed

// const SubscriptionPopup = ({ isOpen, onClose, userId }) => {
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState('current');
//   const [editingId, setEditingId] = useState(null);

//   // Redux state
//   const {
//     categorizedSubscriptions,
//     loading,
//     error
//   } = useSelector((state) => state.payment); // Adjust 'payment' to your slice name

//   // Destructure categorized subscriptions with fallbacks
//   const {
//     active = [],
//     expired = [],
//     pending = [],
//     rejected = [],
//     total = 0
//   } = categorizedSubscriptions;

//   // Get current active subscription (first active one)
//   const currentSubscription = active.length > 0 ? active[0] : null;

//   const fetchSubscriptions = async () => {
//     if (!userId) return;
//     dispatch(getCategorizedUserSubscriptions(userId));
//   };

//   const handleDelete = async (subscriptionId) => {
//     if (!window.confirm('Are you sure you want to delete this subscription request?')) return;
//     try {
//       // Add your delete API call here
//       // await deleteSubscription(subscriptionId);
//       // Then refetch data
//       fetchSubscriptions();
//     } catch (error) {
//       console.error('Failed to delete subscription:', error);
//     }
//   };

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'short', day: 'numeric'
//   });

//   const formatAmount = (amount, currency = 'PKR') => `${currency} ${amount.toLocaleString()}`;

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'expired': return <History className="w-4 h-4 text-gray-500" />;
//       case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
//       default: return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified': return 'bg-green-100 text-green-800';
//       case 'expired': return 'bg-gray-100 text-gray-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getDaysRemaining = (endDate) => {
//     const now = new Date();
//     const end = new Date(endDate);
//     const diffTime = end - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   useEffect(() => {
//     if (isOpen && userId) {
//       fetchSubscriptions();
//     }
//   }, [isOpen, userId]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//         <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//           <h2 className="text-2xl font-bold text-gray-800">My Subscriptions</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b bg-gray-50">
//           {['current', 'history', 'pending', 'rejected'].map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//                 activeTab === tab
//                   ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               {tab === 'current' && `Current Plan (${active.length})`}
//               {tab === 'history' && `History (${expired.length})`}
//               {tab === 'pending' && `Pending (${pending.length})`}
//               {tab === 'rejected' && `Rejected (${rejected.length})`}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-gray-600">Loading subscriptions...</span>
//             </div>
//           ) : error ? (
//             <div className="text-center py-12 text-red-500">
//               <AlertCircle className="w-12 h-12 mx-auto mb-4" />
//               <p className="text-lg font-medium">Error Loading Subscriptions</p>
//               <p className="text-sm mt-2">{error}</p>
//               <button
//                 onClick={fetchSubscriptions}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : (
//             <>
//               {activeTab === 'current' && (
//                 currentSubscription ? (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('active')}
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {currentSubscription.selectedPlan?.planName}
//                           </h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             {currentSubscription.paymentStatus?.status?.toUpperCase() || 'ACTIVE'}
//                           </span>
//                         </div>
//                         {currentSubscription.selectedPlan?.planDuration && (
//                           <div className="mb-4">
//                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                               <Calendar className="w-4 h-4" />
//                               Duration: {currentSubscription.selectedPlan.planDuration}
//                             </div>
//                           </div>
//                         )}
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4" />
//                             {currentSubscription.selectedPlan?.planPrice}
//                           </div>
//                           {currentSubscription.paymentStatus?.submissionDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Started: {formatDate(currentSubscription.paymentStatus.submissionDate)}
//                             </div>
//                           )}
//                           {currentSubscription.paymentStatus?.verificationDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Verified: {formatDate(currentSubscription.paymentStatus.verificationDate)}
//                             </div>
//                           )}
//                           <div>
//                             User: {currentSubscription.userDetails?.fullName}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12 text-gray-500">
//                     <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium">No Active Subscription</p>
//                     <p className="text-sm mt-2">You currently don't have any active subscription plan.</p>
//                   </div>
//                 )
//               )}

//               {['pending', 'rejected'].includes(activeTab) && (
//                 <div className="space-y-4">
//                   {(activeTab === 'pending' ? pending : rejected).map((sub) => (
//                     <div key={sub.id} className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
//                       sub.status === 'rejected'
//                         ? 'bg-red-50 border-red-200'
//                         : 'bg-yellow-50 border-yellow-200'
//                     }`}>
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             {getStatusIcon(sub.paymentStatus?.status || sub.status)}
//                             <h3 className="font-semibold text-lg text-gray-800">
//                               {sub.selectedPlan?.planName}
//                             </h3>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.paymentStatus?.status || sub.status)}`}>
//                               {(sub.paymentStatus?.status || sub.status)?.toUpperCase()}
//                             </span>
//                           </div>
//                           {sub.paymentStatus?.status === 'rejected' && sub.paymentStatus?.rejectionReason && (
//                             <div className="mb-3 p-3 bg-red-100 border border-red-200 rounded-lg">
//                               <p className="text-sm text-red-800 font-medium mb-1">Rejection Reason:</p>
//                               <p className="text-sm text-red-700">{sub.paymentStatus.rejectionReason}</p>
//                             </div>
//                           )}
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                             <div className="flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" />
//                               {sub.selectedPlan?.planPrice}
//                             </div>
//                             {sub.paymentStatus?.submissionDate && (
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 Submitted: {formatDate(sub.paymentStatus.submissionDate)}
//                               </div>
//                             )}
//                             <div className="text-xs text-gray-500">
//                               Payment ID: {sub.paymentId}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex gap-2 ml-4">
//                           <button
//                             onClick={() => setEditingId(sub.id)}
//                             className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
//                             title="Edit"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(sub.id)}
//                             className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {((activeTab === 'pending' && pending.length === 0) ||
//                     (activeTab === 'rejected' && rejected.length === 0)) && (
//                     <div className="text-center py-12 text-gray-500">
//                       <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No {activeTab === 'pending' ? 'Pending' : 'Rejected'} Requests</p>
//                       <p className="text-sm mt-2">Your {activeTab} subscriptions will appear here.</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'history' && (
//                 <div className="space-y-4">
//                   {expired.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Subscription History</p>
//                       <p className="text-sm mt-2">Your past subscriptions will appear here.</p>
//                     </div>
//                   ) : (
//                     expired.map((sub) => (
//                       <div key={sub.id} className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('expired')}
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {sub.selectedPlan?.planName}
//                           </h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">EXPIRED</span>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4" />
//                             {sub.selectedPlan?.planPrice}
//                           </div>
//                           {sub.paymentStatus?.submissionDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Started: {formatDate(sub.paymentStatus.submissionDate)}
//                             </div>
//                           )}
//                           {sub.paymentStatus?.updatedAt && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Updated: {formatDate(sub.paymentStatus.updatedAt)}
//                             </div>
//                           )}
//                           <div className="text-xs">
//                             Duration: {sub.selectedPlan?.planDuration}
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-4 bg-gray-50 text-sm text-gray-600 flex justify-between">
//           <span>
//             Current: {active.length} |
//             History: {expired.length} |
//             Pending: {pending.length} |
//             Rejected: {rejected.length} |
//             Total: {total}
//           </span>
//           <button onClick={fetchSubscriptions} className="text-blue-600 hover:text-blue-800 font-medium">
//             Refresh
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPopup;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   X, Calendar, CreditCard, CheckCircle, Clock, Edit2, Trash2, AlertCircle, History
// } from 'lucide-react';
// import { getCategorizedUserSubscriptions } from '../../../redux/features/paymentSlice'; // Update path as needed

// const SubscriptionPopup = ({ isOpen, onClose, userId }) => {
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState('current');
//   const [editingId, setEditingId] = useState(null);

//   // Redux state
//   const {
//     categorizedSubscriptions,
//     loading,
//     error
//   } = useSelector((state) => state.payment); // Adjust 'payment' to your slice name

//   // Destructure categorized subscriptions with fallbacks
//   const {
//     active = [],
//     expired = [],
//     pending = [],
//     rejected = [],
//     total = 0
//   } = categorizedSubscriptions;

//   // Get current active subscription (first active one)
//   const currentSubscription = active.length > 0 ? active[0] : null;

//   const fetchSubscriptions = async () => {
//     if (!userId) return;
//     dispatch(getCategorizedUserSubscriptions(userId));
//   };

//   const handleDelete = async (subscriptionId) => {
//     if (!window.confirm('Are you sure you want to delete this subscription request?')) return;
//     try {
//       // Add your delete API call here
//       // await deleteSubscription(subscriptionId);
//       // Then refetch data
//       fetchSubscriptions();
//     } catch (error) {
//       console.error('Failed to delete subscription:', error);
//     }
//   };

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'short', day: 'numeric'
//   });

//   const formatAmount = (amount, currency = 'PKR') => `${currency} ${amount.toLocaleString()}`;

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'expired': return <History className="w-4 h-4 text-gray-500" />;
//       case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
//       default: return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified': return 'bg-green-100 text-green-800';
//       case 'expired': return 'bg-gray-100 text-gray-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getDaysRemaining = (endDate) => {
//     const now = new Date();
//     const end = new Date(endDate);
//     const diffTime = end - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   useEffect(() => {
//     if (isOpen && userId) {
//       fetchSubscriptions();
//     }
//   }, [isOpen, userId]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//         <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//           <h2 className="text-2xl font-bold text-gray-800">My Subscriptions</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b bg-gray-50">
//           {['current', 'expired', 'pending', 'rejected'].map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//                 activeTab === tab
//                   ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               {tab === 'current' && `Current Plan (${active.length})`}
//               {tab === 'expired' && `Expired (${expired.length})`}
//               {tab === 'pending' && `Pending (${pending.length})`}
//               {tab === 'rejected' && `Rejected (${rejected.length})`}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-gray-600">Loading subscriptions...</span>
//             </div>
//           ) : error ? (
//             <div className="text-center py-12 text-red-500">
//               <AlertCircle className="w-12 h-12 mx-auto mb-4" />
//               <p className="text-lg font-medium">Error Loading Subscriptions</p>
//               <p className="text-sm mt-2">{error}</p>
//               <button
//                 onClick={fetchSubscriptions}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : (
//             <>
//               {activeTab === 'current' && (
//                 currentSubscription ? (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('active')}
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {currentSubscription.selectedPlan?.planName}
//                           </h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             {currentSubscription.paymentStatus?.status?.toUpperCase() || 'ACTIVE'}
//                           </span>
//                         </div>
//                         {currentSubscription.selectedPlan?.planDuration && (
//                           <div className="mb-4">
//                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                               <Calendar className="w-4 h-4" />
//                               Duration: {currentSubscription.selectedPlan.planDuration}
//                             </div>
//                           </div>
//                         )}
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4" />
//                             {currentSubscription.selectedPlan?.planPrice}
//                           </div>
//                           {currentSubscription.paymentStatus?.submissionDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Started: {formatDate(currentSubscription.paymentStatus.submissionDate)}
//                             </div>
//                           )}
//                           {currentSubscription.paymentStatus?.verificationDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Verified: {formatDate(currentSubscription.paymentStatus.verificationDate)}
//                             </div>
//                           )}
//                           <div>
//                             User: {currentSubscription.userDetails?.fullName}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12 text-gray-500">
//                     <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium">No Active Subscription</p>
//                     <p className="text-sm mt-2">You currently don't have any active subscription plan.</p>
//                   </div>
//                 )
//               )}

//               {activeTab === 'pending' && (
//                 <div className="space-y-4">
//                   {pending.map((sub) => (
//                     <div key={sub.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-yellow-50 border-yellow-200">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             {getStatusIcon(sub.paymentStatus?.status || sub.status)}
//                             <h3 className="font-semibold text-lg text-gray-800">
//                               {sub.selectedPlan?.planName}
//                             </h3>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.paymentStatus?.status || sub.status)}`}>
//                               {(sub.paymentStatus?.status || sub.status)?.toUpperCase()}
//                             </span>
//                           </div>
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                             <div className="flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" />
//                               {sub.selectedPlan?.planPrice}
//                             </div>
//                             {sub.paymentStatus?.submissionDate && (
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 Submitted: {formatDate(sub.paymentStatus.submissionDate)}
//                               </div>
//                             )}
//                             <div className="text-xs text-gray-500">
//                               Payment ID: {sub.paymentId}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex gap-2 ml-4">
//                           <button
//                             onClick={() => setEditingId(sub.id)}
//                             className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
//                             title="Edit"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(sub.id)}
//                             className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {pending.length === 0 && (
//                     <div className="text-center py-12 text-gray-500">
//                       <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Pending Requests</p>
//                       <p className="text-sm mt-2">Your pending subscriptions will appear here.</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'rejected' && (
//                 <div className="space-y-4">
//                   {rejected.map((sub) => (
//                     <div key={sub.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-red-50 border-red-200">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             {getStatusIcon(sub.paymentStatus?.status || sub.status)}
//                             <h3 className="font-semibold text-lg text-gray-800">
//                               {sub.selectedPlan?.planName}
//                             </h3>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.paymentStatus?.status || sub.status)}`}>
//                               {(sub.paymentStatus?.status || sub.status)?.toUpperCase()}
//                             </span>
//                           </div>
//                           {sub.paymentStatus?.status === 'rejected' && sub.paymentStatus?.rejectionReason && (
//                             <div className="mb-3 p-3 bg-red-100 border border-red-200 rounded-lg">
//                               <p className="text-sm text-red-800 font-medium mb-1">Rejection Reason:</p>
//                               <p className="text-sm text-red-700">{sub.paymentStatus.rejectionReason}</p>
//                             </div>
//                           )}
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                             <div className="flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" />
//                               {sub.selectedPlan?.planPrice}
//                             </div>
//                             {sub.paymentStatus?.submissionDate && (
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 Submitted: {formatDate(sub.paymentStatus.submissionDate)}
//                               </div>
//                             )}
//                             <div className="text-xs text-gray-500">
//                               Payment ID: {sub.paymentId}
//                             </div>
//                           </div>
//                         </div>
//                         {/* No action buttons for rejected subscriptions */}
//                       </div>
//                     </div>
//                   ))}
//                   {rejected.length === 0 && (
//                     <div className="text-center py-12 text-gray-500">
//                       <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Rejected Requests</p>
//                       <p className="text-sm mt-2">Your rejected subscriptions will appear here.</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'expired' && (
//                 <div className="space-y-4">
//                   {expired.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Expired Subscriptions</p>
//                       <p className="text-sm mt-2">Your expired subscriptions will appear here.</p>
//                     </div>
//                   ) : (
//                     expired.map((sub) => (
//                       <div key={sub.id} className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('expired')}
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {sub.selectedPlan?.planName}
//                           </h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">EXPIRED</span>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4" />
//                             {sub.selectedPlan?.planPrice}
//                           </div>
//                           {sub.paymentStatus?.submissionDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Started: {formatDate(sub.paymentStatus.submissionDate)}
//                             </div>
//                           )}
//                           {sub.paymentStatus?.updatedAt && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Updated: {formatDate(sub.paymentStatus.updatedAt)}
//                             </div>
//                           )}
//                           <div className="text-xs">
//                             Duration: {sub.selectedPlan?.planDuration}
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-4 bg-gray-50 text-sm text-gray-600 flex justify-between">
//           <span>
//             Current: {active.length} |
//             Expired: {expired.length} |
//             Pending: {pending.length} |
//             Rejected: {rejected.length} |
//             Total: {total}
//           </span>
//           <button onClick={fetchSubscriptions} className="text-blue-600 hover:text-blue-800 font-medium">
//             Refresh
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPopup;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   X, Calendar, CreditCard, CheckCircle, Clock, Edit2, Trash2, AlertCircle, History,
//   User, Mail, Phone, Hash, Building, Receipt, FileImage
// } from 'lucide-react';
// import { getCategorizedUserSubscriptions } from '../../../redux/features/paymentSlice'; // Update path as needed

// const SubscriptionPopup = ({ isOpen, onClose, userId }) => {
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState('current');
//   const [editingId, setEditingId] = useState(null);

//   // Redux state
//   const {
//     categorizedSubscriptions,
//     loading,
//     error
//   } = useSelector((state) => state.payment); // Adjust 'payment' to your slice name

//   // Destructure categorized subscriptions with fallbacks
//   const {
//     active = [],
//     expired = [],
//     pending = [],
//     rejected = [],
//     total = 0
//   } = categorizedSubscriptions;

//   // Get current active subscription (first active one)
//   const currentSubscription = active.length > 0 ? active[0] : null;

//   const fetchSubscriptions = async () => {
//     if (!userId) return;
//     dispatch(getCategorizedUserSubscriptions(userId));
//   };

//   const handleDelete = async (subscriptionId) => {
//     if (!window.confirm('Are you sure you want to delete this subscription request?')) return;
//     try {
//       // Add your delete API call here
//       // await deleteSubscription(subscriptionId);
//       // Then refetch data
//       fetchSubscriptions();
//     } catch (error) {
//       console.error('Failed to delete subscription:', error);
//     }
//   };

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'short', day: 'numeric'
//   });

//   const formatAmount = (amount, currency = 'PKR') => `${currency} ${amount.toLocaleString()}`;

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'expired': return <History className="w-4 h-4 text-gray-500" />;
//       case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
//       default: return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified': return 'bg-green-100 text-green-800';
//       case 'expired': return 'bg-gray-100 text-gray-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getDaysRemaining = (endDate) => {
//     const now = new Date();
//     const end = new Date(endDate);
//     const diffTime = end - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   useEffect(() => {
//     if (isOpen && userId) {
//       fetchSubscriptions();
//     }
//   }, [isOpen, userId]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//         <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//           <h2 className="text-2xl font-bold text-gray-800">My Subscriptions</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b bg-gray-50">
//           {['current', 'expired', 'pending', 'rejected'].map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//                 activeTab === tab
//                   ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               {tab === 'current' && `Current Plan (${active.length})`}
//               {tab === 'expired' && `Expired (${expired.length})`}
//               {tab === 'pending' && `Pending (${pending.length})`}
//               {tab === 'rejected' && `Rejected (${rejected.length})`}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-gray-600">Loading subscriptions...</span>
//             </div>
//           ) : error ? (
//             <div className="text-center py-12 text-red-500">
//               <AlertCircle className="w-12 h-12 mx-auto mb-4" />
//               <p className="text-lg font-medium">Error Loading Subscriptions</p>
//               <p className="text-sm mt-2">{error}</p>
//               <button
//                 onClick={fetchSubscriptions}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : (
//             <>
//               {activeTab === 'current' && (
//                 currentSubscription ? (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('active')}
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {currentSubscription.selectedPlan?.planName}
//                           </h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             {currentSubscription.paymentStatus?.status?.toUpperCase() || 'ACTIVE'}
//                           </span>
//                         </div>
//                         {currentSubscription.selectedPlan?.planDuration && (
//                           <div className="mb-4">
//                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                               <Calendar className="w-4 h-4" />
//                               Duration: {currentSubscription.selectedPlan.planDuration}
//                             </div>
//                           </div>
//                         )}
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4" />
//                             {currentSubscription.selectedPlan?.planPrice}
//                           </div>
//                           {currentSubscription.paymentStatus?.submissionDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Started: {formatDate(currentSubscription.paymentStatus.submissionDate)}
//                             </div>
//                           )}
//                           {currentSubscription.paymentStatus?.verificationDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Verified: {formatDate(currentSubscription.paymentStatus.verificationDate)}
//                             </div>
//                           )}
//                           <div className="flex items-center gap-2">
//                             <User className="w-4 h-4" />
//                             {currentSubscription.userDetails?.fullName}
//                           </div>
//                         </div>

//                         {/* Additional Payment Details */}
//                         <div className="mt-4 pt-4 border-t border-green-200">
//                           <h4 className="text-sm font-medium text-gray-800 mb-3">Payment Details</h4>
//                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
//                             {currentSubscription.userDetails?.email && (
//                               <div className="flex items-center gap-2 text-gray-600">
//                                 <Mail className="w-4 h-4" />
//                                 <span className="truncate">{currentSubscription.userDetails.email}</span>
//                               </div>
//                             )}
//                             {currentSubscription.userDetails?.phoneNumber && (
//                               <div className="flex items-center gap-2 text-gray-600">
//                                 <Phone className="w-4 h-4" />
//                                 {currentSubscription.userDetails.phoneNumber}
//                               </div>
//                             )}
//                             {currentSubscription.transactionId && (
//                               <div className="flex items-center gap-2 text-gray-600">
//                                 <Hash className="w-4 h-4" />
//                                 Transaction: {currentSubscription.transactionId}
//                               </div>
//                             )}
//                             {currentSubscription.paymentMethod && (
//                               <div className="flex items-center gap-2 text-gray-600">
//                                 <Building className="w-4 h-4" />
//                                 Method: {currentSubscription.paymentMethod}
//                               </div>
//                             )}
//                             {currentSubscription.receiptUrl && (
//                               <div className="flex items-center gap-2 text-gray-600">
//                                 <Receipt className="w-4 h-4" />
//                                 <a
//                                   href={currentSubscription.receiptUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-blue-600 hover:text-blue-800 underline"
//                                 >
//                                   View Receipt
//                                 </a>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12 text-gray-500">
//                     <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium">No Active Subscription</p>
//                     <p className="text-sm mt-2">You currently don't have any active subscription plan.</p>
//                   </div>
//                 )
//               )}

//               {activeTab === 'pending' && (
//                 <div className="space-y-4">
//                   {pending.map((sub) => (
//                     <div key={sub.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-yellow-50 border-yellow-200">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             {getStatusIcon(sub.paymentStatus?.status || sub.status)}
//                             <h3 className="font-semibold text-lg text-gray-800">
//                               {sub.selectedPlan?.planName}
//                             </h3>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.paymentStatus?.status || sub.status)}`}>
//                               {(sub.paymentStatus?.status || sub.status)?.toUpperCase()}
//                             </span>
//                           </div>
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                             <div className="flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" />
//                               {sub.selectedPlan?.planPrice}
//                             </div>
//                             {sub.paymentStatus?.submissionDate && (
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 Submitted: {formatDate(sub.paymentStatus.submissionDate)}
//                               </div>
//                             )}
//                             <div className="flex items-center gap-2">
//                               <User className="w-4 h-4" />
//                               {sub.userDetails?.fullName || 'N/A'}
//                             </div>
//                           </div>

//                           {/* Additional Payment Details */}
//                           <div className="mt-3 pt-3 border-t border-yellow-200">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
//                               {sub.userDetails?.email && (
//                                 <div className="flex items-center gap-2">
//                                   <Mail className="w-3 h-3" />
//                                   <span className="truncate">{sub.userDetails.email}</span>
//                                 </div>
//                               )}
//                               {sub.userDetails?.phoneNumber && (
//                                 <div className="flex items-center gap-2">
//                                   <Phone className="w-3 h-3" />
//                                   {sub.userDetails.phoneNumber}
//                                 </div>
//                               )}
//                               {sub.transactionId && (
//                                 <div className="flex items-center gap-2">
//                                   <Hash className="w-3 h-3" />
//                                   Transaction: {sub.transactionId}
//                                 </div>
//                               )}
//                               {sub.paymentMethod && (
//                                 <div className="flex items-center gap-2">
//                                   <Building className="w-3 h-3" />
//                                   Method: {sub.paymentMethod}
//                                 </div>
//                               )}
//                               {sub.receiptUrl && (
//                                 <div className="flex items-center gap-2">
//                                   <Receipt className="w-3 h-3" />
//                                   <a
//                                     href={sub.receiptUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600 hover:text-blue-800 underline text-xs"
//                                   >
//                                     View Receipt
//                                   </a>
//                                 </div>
//                               )}
//                               <div className="flex items-center gap-2">
//                                 <Hash className="w-3 h-3" />
//                                 Payment ID: {sub.paymentId}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex gap-2 ml-4">
//                           <button
//                             onClick={() => setEditingId(sub.id)}
//                             className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
//                             title="Edit"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(sub.id)}
//                             className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {pending.length === 0 && (
//                     <div className="text-center py-12 text-gray-500">
//                       <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Pending Requests</p>
//                       <p className="text-sm mt-2">Your pending subscriptions will appear here.</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'rejected' && (
//                 <div className="space-y-4">
//                   {rejected.map((sub) => (
//                     <div key={sub.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-red-50 border-red-200">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             {getStatusIcon(sub.paymentStatus?.status || sub.status)}
//                             <h3 className="font-semibold text-lg text-gray-800">
//                               {sub.selectedPlan?.planName}
//                             </h3>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.paymentStatus?.status || sub.status)}`}>
//                               {(sub.paymentStatus?.status || sub.status)?.toUpperCase()}
//                             </span>
//                           </div>
//                           {sub.paymentStatus?.status === 'rejected' && sub.paymentStatus?.rejectionReason && (
//                             <div className="mb-3 p-3 bg-red-100 border border-red-200 rounded-lg">
//                               <p className="text-sm text-red-800 font-medium mb-1">Rejection Reason:</p>
//                               <p className="text-sm text-red-700">{sub.paymentStatus.rejectionReason}</p>
//                             </div>
//                           )}
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                             <div className="flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" />
//                               {sub.selectedPlan?.planPrice}
//                             </div>
//                             {sub.paymentStatus?.submissionDate && (
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 Submitted: {formatDate(sub.paymentStatus.submissionDate)}
//                               </div>
//                             )}
//                             <div className="flex items-center gap-2">
//                               <User className="w-4 h-4" />
//                               {sub.userDetails?.fullName || 'N/A'}
//                             </div>
//                           </div>

//                           {/* Additional Payment Details */}
//                           <div className="mt-3 pt-3 border-t border-red-200">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
//                               {sub.userDetails?.email && (
//                                 <div className="flex items-center gap-2">
//                                   <Mail className="w-3 h-3" />
//                                   <span className="truncate">{sub.userDetails.email}</span>
//                                 </div>
//                               )}
//                               {sub.userDetails?.phoneNumber && (
//                                 <div className="flex items-center gap-2">
//                                   <Phone className="w-3 h-3" />
//                                   {sub.userDetails.phoneNumber}
//                                 </div>
//                               )}
//                               {sub.transactionId && (
//                                 <div className="flex items-center gap-2">
//                                   <Hash className="w-3 h-3" />
//                                   Transaction: {sub.transactionId}
//                                 </div>
//                               )}
//                               {sub.paymentMethod && (
//                                 <div className="flex items-center gap-2">
//                                   <Building className="w-3 h-3" />
//                                   Method: {sub.paymentMethod}
//                                 </div>
//                               )}
//                               {sub.receiptUrl && (
//                                 <div className="flex items-center gap-2">
//                                   <Receipt className="w-3 h-3" />
//                                   <a
//                                     href={sub.receiptUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600 hover:text-blue-800 underline text-xs"
//                                   >
//                                     View Receipt
//                                   </a>
//                                 </div>
//                               )}
//                               <div className="flex items-center gap-2">
//                                 <Hash className="w-3 h-3" />
//                                 Payment ID: {sub.paymentId}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         {/* No action buttons for rejected subscriptions */}
//                       </div>
//                     </div>
//                   ))}
//                   {rejected.length === 0 && (
//                     <div className="text-center py-12 text-gray-500">
//                       <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Rejected Requests</p>
//                       <p className="text-sm mt-2">Your rejected subscriptions will appear here.</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'expired' && (
//                 <div className="space-y-4">
//                   {expired.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Expired Subscriptions</p>
//                       <p className="text-sm mt-2">Your expired subscriptions will appear here.</p>
//                     </div>
//                   ) : (
//                     expired.map((sub) => (
//                       <div key={sub.id} className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('expired')}
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {sub.selectedPlan?.planName}
//                           </h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">EXPIRED</span>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4" />
//                             {sub.selectedPlan?.planPrice}
//                           </div>
//                           {sub.paymentStatus?.submissionDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Started: {formatDate(sub.paymentStatus.submissionDate)}
//                             </div>
//                           )}
//                           {sub.paymentStatus?.updatedAt && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Updated: {formatDate(sub.paymentStatus.updatedAt)}
//                             </div>
//                           )}
//                           <div className="flex items-center gap-2">
//                             <User className="w-4 h-4" />
//                             {sub.userDetails?.fullName || 'N/A'}
//                           </div>
//                         </div>

//                         {/* Additional Payment Details */}
//                         <div className="mt-3 pt-3 border-t border-gray-300">
//                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-gray-600">
//                             {sub.userDetails?.email && (
//                               <div className="flex items-center gap-2">
//                                 <Mail className="w-3 h-3" />
//                                 <span className="truncate">{sub.userDetails.email}</span>
//                               </div>
//                             )}
//                             {sub.userDetails?.phoneNumber && (
//                               <div className="flex items-center gap-2">
//                                 <Phone className="w-3 h-3" />
//                                 {sub.userDetails.phoneNumber}
//                               </div>
//                             )}
//                             {sub.transactionId && (
//                               <div className="flex items-center gap-2">
//                                 <Hash className="w-3 h-3" />
//                                 Transaction: {sub.transactionId}
//                               </div>
//                             )}
//                             {sub.paymentMethod && (
//                               <div className="flex items-center gap-2">
//                                 <Building className="w-3 h-3" />
//                                 Method: {sub.paymentMethod}
//                               </div>
//                             )}
//                             {sub.receiptUrl && (
//                               <div className="flex items-center gap-2">
//                                 <Receipt className="w-3 h-3" />
//                                 <a
//                                   href={sub.receiptUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-blue-600 hover:text-blue-800 underline text-xs"
//                                 >
//                                   View Receipt
//                                 </a>
//                               </div>
//                             )}
//                             <div className="flex items-center gap-2">
//                               <Hash className="w-3 h-3" />
//                               Duration: {sub.selectedPlan?.planDuration}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-4 bg-gray-50 text-sm text-gray-600 flex justify-between">
//           <span>
//             Current: {active.length} |
//             Expired: {expired.length} |
//             Pending: {pending.length} |
//             Rejected: {rejected.length} |
//             Total: {total}
//           </span>
//           <button onClick={fetchSubscriptions} className="text-blue-600 hover:text-blue-800 font-medium">
//             Refresh
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPopup;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   X, Calendar, CreditCard, CheckCircle, Clock, Edit2, Trash2, AlertCircle, History,
//   User, Mail, Phone, Hash, Building, Receipt, FileImage
// } from 'lucide-react';
// import { getCategorizedUserSubscriptions } from '../../../redux/features/paymentSlice'; // Update path as needed

// const SubscriptionPopup = ({ isOpen, onClose, userId }) => {
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState('current');
//   const [editingId, setEditingId] = useState(null);

//   // Redux state
//   const {
//     categorizedSubscriptions,
//     loading,
//     error
//   } = useSelector((state) => state.payment); // Adjust 'payment' to your slice name

//   // Destructure categorized subscriptions with fallbacks
//   const {
//     active = [],
//     expired = [],
//     pending = [],
//     rejected = [],
//     total = 0
//   } = categorizedSubscriptions;

//   // Get current active subscription (first active one)
//   const currentSubscription = active.length > 0 ? active[0] : null;

//   const fetchSubscriptions = async () => {
//     if (!userId) return;
//     dispatch(getCategorizedUserSubscriptions(userId));
//   };

//   const handleDelete = async (subscriptionId) => {
//     if (!window.confirm('Are you sure you want to delete this subscription request?')) return;
//     try {
//       // Add your delete API call here
//       // await deleteSubscription(subscriptionId);
//       // Then refetch data
//       fetchSubscriptions();
//     } catch (error) {
//       console.error('Failed to delete subscription:', error);
//     }
//   };

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', {
//     year: 'numeric', month: 'short', day: 'numeric'
//   });

//   const formatAmount = (amount, currency = 'PKR') => `${currency} ${amount.toLocaleString()}`;

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'expired': return <History className="w-4 h-4 text-gray-500" />;
//       case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'rejected': return <AlertCircle className="w-4 h-4 text-red-500" />;
//       default: return <Clock className="w-4 h-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active':
//       case 'verified': return 'bg-green-100 text-green-800';
//       case 'expired': return 'bg-gray-100 text-gray-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'rejected': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getDaysRemaining = (endDate) => {
//     const now = new Date();
//     const end = new Date(endDate);
//     const diffTime = end - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   useEffect(() => {
//     if (isOpen && userId) {
//       fetchSubscriptions();
//     }
//   }, [isOpen, userId]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
//         <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//           <h2 className="text-2xl font-bold text-gray-800">My Subscriptions</h2>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b bg-gray-50">
//           {['current', 'expired', 'pending', 'rejected'].map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
//                 activeTab === tab
//                   ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                   : 'text-gray-600 hover:text-gray-800'
//               }`}
//             >
//               {tab === 'current' && `Current Plan (${active.length})`}
//               {tab === 'expired' && `Expired (${expired.length})`}
//               {tab === 'pending' && `Pending (${pending.length})`}
//               {tab === 'rejected' && `Rejected (${rejected.length})`}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//           {loading ? (
//             <div className="flex justify-center items-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               <span className="ml-3 text-gray-600">Loading subscriptions...</span>
//             </div>
//           ) : error ? (
//             <div className="text-center py-12 text-red-500">
//               <AlertCircle className="w-12 h-12 mx-auto mb-4" />
//               <p className="text-lg font-medium">Error Loading Subscriptions</p>
//               <p className="text-sm mt-2">{error}</p>
//               <button
//                 onClick={fetchSubscriptions}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : (
//             <>
//               {activeTab === 'current' && (
//                 currentSubscription ? (
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-6">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('active')}
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {currentSubscription.selectedPlan?.planName}
//                           </h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             {currentSubscription.paymentStatus?.status?.toUpperCase() || 'ACTIVE'}
//                           </span>
//                         </div>
//                         {currentSubscription.selectedPlan?.planDuration && (
//                           <div className="mb-4">
//                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
//                               <Calendar className="w-4 h-4" />
//                               Duration: {currentSubscription.selectedPlan.planDuration}
//                             </div>
//                           </div>
//                         )}
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4" />
//                             {currentSubscription.selectedPlan?.planPrice}
//                           </div>
//                           {currentSubscription.paymentStatus?.submissionDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Started: {formatDate(currentSubscription.paymentStatus.submissionDate)}
//                             </div>
//                           )}
//                           {currentSubscription.paymentStatus?.verificationDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Verified: {formatDate(currentSubscription.paymentStatus.verificationDate)}
//                             </div>
//                           )}
//                           <div className="flex items-center gap-2">
//                             <User className="w-4 h-4" />
//                             {currentSubscription.userDetails?.fullName}
//                           </div>
//                         </div>

//                         {/* Additional Payment Details */}
//                         <div className="mt-4 pt-4 border-t border-green-200">
//                           <h4 className="text-sm font-medium text-gray-800 mb-3">Payment Details</h4>
//                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
//                             {currentSubscription.userDetails?.email && (
//                               <div className="flex items-center gap-2 text-gray-600">
//                                 <Mail className="w-4 h-4" />
//                                 <span className="truncate">{currentSubscription.userDetails.email}</span>
//                               </div>
//                             )}
//                             {currentSubscription.userDetails?.phoneNumber && (
//                               <div className="flex items-center gap-2 text-gray-600">
//                                 <Phone className="w-4 h-4" />
//                                 {currentSubscription.userDetails.phoneNumber}
//                               </div>
//                             )}
//                             {currentSubscription.transactionId && (
//                               <div className="flex items-center gap-2 text-gray-600">
//                                 <Hash className="w-4 h-4" />
//                                 Transaction: {currentSubscription.transactionId}
//                               </div>
//                             )}
//                             {currentSubscription.paymentMethod && (
//                               <div className="flex items-center gap-2 text-gray-600">
//                                 <Building className="w-4 h-4" />
//                                 Method: {currentSubscription.paymentMethod}
//                               </div>
//                             )}
//                             {currentSubscription.receiptUrl && (
//                               <div className="flex items-center gap-2 text-gray-600">
//                                 <Receipt className="w-4 h-4" />
//                                 <a
//                                   href={currentSubscription.receiptUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-blue-600 hover:text-blue-800 underline"
//                                 >
//                                   View Receipt
//                                 </a>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12 text-gray-500">
//                     <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium">No Active Subscription</p>
//                     <p className="text-sm mt-2">You currently don't have any active subscription plan.</p>
//                   </div>
//                 )
//               )}

//               {activeTab === 'pending' && (
//                 <div className="space-y-4">
//                   {pending.map((sub) => (
//                     <div key={sub.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-yellow-50 border-yellow-200">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             {getStatusIcon(sub.paymentStatus?.status || sub.status)}
//                             <h3 className="font-semibold text-lg text-gray-800">
//                               {sub.selectedPlan?.planName}
//                             </h3>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.paymentStatus?.status || sub.status)}`}>
//                               {(sub.paymentStatus?.status || sub.status)?.toUpperCase()}
//                             </span>
//                           </div>
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                             <div className="flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" />
//                               {sub.selectedPlan?.planPrice}
//                             </div>
//                             {sub.paymentStatus?.submissionDate && (
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 Submitted: {formatDate(sub.paymentStatus.submissionDate)}
//                               </div>
//                             )}
//                             <div className="flex items-center gap-2">
//                               <User className="w-4 h-4" />
//                               {sub.userDetails?.fullName || 'N/A'}
//                             </div>
//                           </div>

//                           {/* Additional Payment Details */}
//                           <div className="mt-3 pt-3 border-t border-yellow-200">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
//                               {sub.userDetails?.email && (
//                                 <div className="flex items-center gap-2">
//                                   <Mail className="w-3 h-3" />
//                                   <span className="truncate">{sub.userDetails.email}</span>
//                                 </div>
//                               )}
//                               {sub.userDetails?.phoneNumber && (
//                                 <div className="flex items-center gap-2">
//                                   <Phone className="w-3 h-3" />
//                                   {sub.userDetails.phoneNumber}
//                                 </div>
//                               )}
//                               {sub.transactionId && (
//                                 <div className="flex items-center gap-2">
//                                   <Hash className="w-3 h-3" />
//                                   Transaction ID: {sub.transactionId}
//                                 </div>
//                               )}
//                               {sub.paymentMethod && (
//                                 <div className="flex items-center gap-2">
//                                   <Building className="w-3 h-3" />
//                                   Method: {sub.paymentMethod}
//                                 </div>
//                               )}
//                               {sub.receiptUrl && (
//                                 <div className="flex items-center gap-2">
//                                   <Receipt className="w-3 h-3" />
//                                   <a
//                                     href={sub.receiptUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600 hover:text-blue-800 underline text-xs"
//                                   >
//                                     View Receipt
//                                   </a>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex gap-2 ml-4">
//                           <button
//                             onClick={() => setEditingId(sub.id)}
//                             className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
//                             title="Edit"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(sub.id)}
//                             className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {pending.length === 0 && (
//                     <div className="text-center py-12 text-gray-500">
//                       <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Pending Requests</p>
//                       <p className="text-sm mt-2">Your pending subscriptions will appear here.</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'rejected' && (
//                 <div className="space-y-4">
//                   {rejected.map((sub) => (
//                     <div key={sub.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-red-50 border-red-200">
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-3">
//                             {getStatusIcon(sub.paymentStatus?.status || sub.status)}
//                             <h3 className="font-semibold text-lg text-gray-800">
//                               {sub.selectedPlan?.planName}
//                             </h3>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.paymentStatus?.status || sub.status)}`}>
//                               {(sub.paymentStatus?.status || sub.status)?.toUpperCase()}
//                             </span>
//                           </div>
//                           {sub.paymentStatus?.status === 'rejected' && sub.paymentStatus?.rejectionReason && (
//                             <div className="mb-3 p-3 bg-red-100 border border-red-200 rounded-lg">
//                               <p className="text-sm text-red-800 font-medium mb-1">Rejection Reason:</p>
//                               <p className="text-sm text-red-700">{sub.paymentStatus.rejectionReason}</p>
//                             </div>
//                           )}
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
//                             <div className="flex items-center gap-2">
//                               <CreditCard className="w-4 h-4" />
//                               {sub.selectedPlan?.planPrice}
//                             </div>
//                             {sub.paymentStatus?.submissionDate && (
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="w-4 h-4" />
//                                 Submitted: {formatDate(sub.paymentStatus.submissionDate)}
//                               </div>
//                             )}
//                             <div className="flex items-center gap-2">
//                               <User className="w-4 h-4" />
//                               {sub.userDetails?.fullName || 'N/A'}
//                             </div>
//                           </div>

//                           {/* Additional Payment Details */}
//                           <div className="mt-3 pt-3 border-t border-red-200">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
//                               {sub.userDetails?.email && (
//                                 <div className="flex items-center gap-2">
//                                   <Mail className="w-3 h-3" />
//                                   <span className="truncate">{sub.userDetails.email}</span>
//                                 </div>
//                               )}
//                               {sub.userDetails?.phoneNumber && (
//                                 <div className="flex items-center gap-2">
//                                   <Phone className="w-3 h-3" />
//                                   {sub.userDetails.phoneNumber}
//                                 </div>
//                               )}
//                               {sub.paymentDetails?.transactionId && (
//                                 <div className="flex items-center gap-2">
//                                   <Hash className="w-3 h-3" />
//                                   Transaction ID: {sub.paymentDetails.transactionId}
//                                 </div>
//                               )}
//                               {sub.paymentMethod && (
//                                 <div className="flex items-center gap-2">
//                                   <Building className="w-3 h-3" />
//                                   Method: {sub.paymentMethod}
//                                 </div>
//                               )}
//                               {sub.receiptUrl && (
//                                 <div className="flex items-center gap-2">
//                                   <Receipt className="w-3 h-3" />
//                                   <a
//                                     href={sub.receiptUrl}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="text-blue-600 hover:text-blue-800 underline text-xs"
//                                   >
//                                     View Receipt
//                                   </a>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                         {/* No action buttons for rejected subscriptions */}
//                       </div>
//                     </div>
//                   ))}
//                   {rejected.length === 0 && (
//                     <div className="text-center py-12 text-gray-500">
//                       <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Rejected Requests</p>
//                       <p className="text-sm mt-2">Your rejected subscriptions will appear here.</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'expired' && (
//                 <div className="space-y-4">
//                   {expired.length === 0 ? (
//                     <div className="text-center py-12 text-gray-500">
//                       <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p className="text-lg font-medium">No Expired Subscriptions</p>
//                       <p className="text-sm mt-2">Your expired subscriptions will appear here.</p>
//                     </div>
//                   ) : (
//                     expired.map((sub) => (
//                       <div key={sub.id} className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow">
//                         <div className="flex items-center gap-3 mb-3">
//                           {getStatusIcon('expired')}
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             {sub.selectedPlan?.planName}
//                           </h3>
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">EXPIRED</span>
//                         </div>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <CreditCard className="w-4 h-4" />
//                             {sub.selectedPlan?.planPrice}
//                           </div>
//                           {sub.paymentStatus?.submissionDate && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Started: {formatDate(sub.paymentStatus.submissionDate)}
//                             </div>
//                           )}
//                           {sub.paymentStatus?.updatedAt && (
//                             <div className="flex items-center gap-2">
//                               <Calendar className="w-4 h-4" />
//                               Updated: {formatDate(sub.paymentStatus.updatedAt)}
//                             </div>
//                           )}
//                           <div className="flex items-center gap-2">
//                             <User className="w-4 h-4" />
//                             {sub.userDetails?.fullName || 'N/A'}
//                           </div>
//                         </div>

//                         {/* Additional Payment Details */}
//                         <div className="mt-3 pt-3 border-t border-gray-300">
//                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-gray-600">
//                             {sub.userDetails?.email && (
//                               <div className="flex items-center gap-2">
//                                 <Mail className="w-3 h-3" />
//                                 <span className="truncate">{sub.userDetails.email}</span>
//                               </div>
//                             )}
//                             {sub.userDetails?.phoneNumber && (
//                               <div className="flex items-center gap-2">
//                                 <Phone className="w-3 h-3" />
//                                 {sub.userDetails.phoneNumber}
//                               </div>
//                             )}
//                             {sub.transactionId && (
//                               <div className="flex items-center gap-2">
//                                 <Hash className="w-3 h-3" />
//                                 Transaction ID: {sub.transactionId}
//                               </div>
//                             )}
//                             {sub.paymentMethod && (
//                               <div className="flex items-center gap-2">
//                                 <Building className="w-3 h-3" />
//                                 Method: {sub.paymentMethod}
//                               </div>
//                             )}
//                             {sub.receiptUrl && (
//                               <div className="flex items-center gap-2">
//                                 <Receipt className="w-3 h-3" />
//                                 <a
//                                   href={sub.receiptUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-blue-600 hover:text-blue-800 underline text-xs"
//                                 >
//                                   View Receipt
//                                 </a>
//                               </div>
//                             )}
//                             {sub.paymentId && (
//                               <div className="flex items-center gap-2">
//                                 <Hash className="w-3 h-3" />
//                                 Payment ID: {sub.paymentId}
//                               </div>
//                             )}
//                             <div className="flex items-center gap-2">
//                               <Hash className="w-3 h-3" />
//                               Duration: {sub.selectedPlan?.planDuration}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="border-t border-gray-200 p-4 bg-gray-50 text-sm text-gray-600 flex justify-between">
//           <span>
//             Current: {active.length} |
//             Expired: {expired.length} |
//             Pending: {pending.length} |
//             Rejected: {rejected.length} |
//             Total: {total}
//           </span>
//           <button onClick={fetchSubscriptions} className="text-blue-600 hover:text-blue-800 font-medium">
//             Refresh
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubscriptionPopup;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  Edit2,
  Trash2,
  AlertCircle,
  History,
  User,
  Mail,
  Phone,
  Hash,
  Building,
  Receipt,
  FileImage,
} from "lucide-react";
import { getCategorizedUserSubscriptions } from "../../../redux/features/paymentSlice"; // Update path as needed

const SubscriptionPopup = ({ isOpen, onClose, userId }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("current");
  const [editingId, setEditingId] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

  // Redux state
  const { categorizedSubscriptions, loading, error } = useSelector(
    (state) => state.payment
  ); // Adjust 'payment' to your slice name

  // Destructure categorized subscriptions with fallbacks
  const {
    active = [],
    expired = [],
    pending = [],
    rejected = [],
    total = 0,
  } = categorizedSubscriptions;

  // Get current active subscription (first active one)
  const currentSubscription = active.length > 0 ? active[0] : null;

  const fetchSubscriptions = async () => {
    if (!userId) return;
    dispatch(getCategorizedUserSubscriptions(userId));
  };

  const handleDelete = async (subscriptionId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this subscription request?"
      )
    )
      return;
    try {
      // Add your delete API call here
      // await deleteSubscription(subscriptionId);
      // Then refetch data
      fetchSubscriptions();
    } catch (error) {
      console.error("Failed to delete subscription:", error);
    }
  };

  const formatAmount = (amount, currency = "PKR") =>
    `${currency} ${amount.toLocaleString()}`;

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "expired":
        return <History className="w-4 h-4 text-gray-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "verified":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    if (isOpen && userId) {
      fetchSubscriptions();
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  const handleImageClick = (fileName) => {
    const url = `${process.env.REACT_APP_BACKEND}/uploads/receipts/${fileName}`;
    setModalImageUrl(url);
    setImageModalOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-800">My Subscriptions</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          {["current", "expired", "pending", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab === "current" && `Current Plan (${active.length})`}
              {tab === "expired" && `Expired (${expired.length})`}
              {tab === "pending" && `Pending (${pending.length})`}
              {tab === "rejected" && `Rejected (${rejected.length})`}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                Loading subscriptions...
              </span>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg font-medium">Error Loading Subscriptions</p>
              <p className="text-sm mt-2">{error}</p>
              <button
                onClick={fetchSubscriptions}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {activeTab === "current" &&
                (currentSubscription ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {getStatusIcon("active")}
                          <h3 className="font-semibold text-lg text-gray-800">
                            {currentSubscription.selectedPlan?.planName}
                          </h3>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {currentSubscription.paymentStatus?.status?.toUpperCase() ||
                              "ACTIVE"}
                          </span>
                        </div>
                        {currentSubscription.selectedPlan?.planDuration && (
                          <div className="mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              <Calendar className="w-4 h-4" />
                              Duration:{" "}
                              {currentSubscription.selectedPlan.planDuration}
                            </div>
                          </div>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            {currentSubscription.selectedPlan?.planPrice}
                          </div>
                          {currentSubscription.paymentStatus
                            ?.subscriptionStartDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Started:{" "}
                              {formatDate(
                                currentSubscription.paymentStatus.subscriptionStartDate
                              )}
                            </div>
                          )}
                          {currentSubscription.paymentStatus
                            ?.verificationDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Verified:{" "}
                              {formatDate(
                                currentSubscription.paymentStatus
                                  .verificationDate
                              )}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {currentSubscription.userDetails?.fullName}
                          </div>
                        </div>

                        {/* Additional Payment Details */}
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <h4 className="text-sm font-medium text-gray-800 mb-3">
                            Payment Details
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                            {currentSubscription.userDetails?.email && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span className="truncate">
                                  {currentSubscription.userDetails.email}
                                </span>
                              </div>
                            )}
                            {currentSubscription.userDetails?.email && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span className="truncate">
                                  {currentSubscription.userDetails.email}
                                </span>
                              </div>
                            )}
                            {currentSubscription.userDetails?.phoneNumber && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4" />
                                {currentSubscription.userDetails.phoneNumber}
                              </div>
                            )}
                            {currentSubscription.transactionId && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Hash className="w-4 h-4" />
                                Transaction: {currentSubscription.transactionId}
                              </div>
                            )}
                            {currentSubscription.paymentMethod && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Building className="w-4 h-4" />
                                Method: {currentSubscription.paymentMethod}
                              </div>
                            )}
                            {currentSubscription.receiptUrl && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Receipt className="w-4 h-4" />
                                <a
                                  href={currentSubscription.receiptUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline"
                                >
                                  View Receipt
                                </a>
                              </div>
                            )}
                            {currentSubscription.selectedPlan?.planDuration && (
                              <div className="flex items-center gap-2">
                                <Hash className="w-3 h-3" />
                                Duration:{" "}
                                {currentSubscription.selectedPlan?.planDuration}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">
                      No Active Subscription
                    </p>
                    <p className="text-sm mt-2">
                      You currently don't have any active subscription plan.
                    </p>
                  </div>
                ))}

              {activeTab === "pending" && (
                <div className="space-y-4">
                  {pending.map((sub) => (
                    <div
                      key={sub.id}
                      className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-yellow-50 border-yellow-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            {getStatusIcon(
                              sub.paymentStatus?.status || sub.status
                            )}
                            <h3 className="font-semibold text-lg text-gray-800">
                              {sub.selectedPlan?.planName}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                sub.paymentStatus?.status || sub.status
                              )}`}
                            >
                              {(
                                sub.paymentStatus?.status || sub.status
                              )?.toUpperCase()}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              {sub.selectedPlan?.planPrice}
                            </div>
                            {sub.paymentStatus?.submissionDate && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Submitted:{" "}
                                {formatDate(sub.paymentStatus.submissionDate)}
                              </div>
                            )}
                          </div>

                          {/* Additional Payment Details */}
                          <div className="mt-3 pt-3 border-t border-yellow-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-gray-600">
                              {sub.userDetails?.fullName && (
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3 h-3" />
                                  <span className="truncate">
                                    {sub.userDetails?.fullName}
                                  </span>
                                </div>
                              )}
                              {sub.userDetails?.email && (
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3 h-3" />
                                  <span className="truncate">
                                    {sub.userDetails.email}
                                  </span>
                                </div>
                              )}
                              {sub.userDetails?.phoneNumber && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  {sub.userDetails.phoneNumber}
                                </div>
                              )}
                              {sub.paymentDetails?.transactionId && (
                                <div className="flex items-center gap-2">
                                  <Hash className="w-3 h-3" />
                                  Transaction ID:{" "}
                                  {sub.paymentDetails.transactionId}
                                </div>
                              )}
                              {sub.paymentDetails?.paymentMethod && (
                                <div className="flex items-center gap-2">
                                  <Building className="w-3 h-3" />
                                  Method: {sub.paymentDetails.paymentMethod}
                                </div>
                              )}
                              {sub.paymentReceipt?.fileName && (
                              <button
                                onClick={() =>
                                  handleImageClick(
                                    sub.paymentReceipt.fileName.replace(
                                      /['",]/g,
                                      ""
                                    )
                                  )
                                }
                                className="text-blue-600 hover:underline text-xs flex items-center gap-1"
                              >
                                <FileImage className="w-3 h-3" />
                                Payment Receipt
                              </button>
                            )}
                              {sub.selectedPlan?.planDuration && (
                                <div className="flex items-center gap-2">
                                  <Hash className="w-3 h-3" />
                                  Duration: {sub.selectedPlan?.planDuration}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => setEditingId(sub.id)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(sub.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pending.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No Pending Requests</p>
                      <p className="text-sm mt-2">
                        Your pending subscriptions will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "rejected" && (
                <div className="space-y-4">
                  {rejected.map((sub) => (
                    <div
                      key={sub.id}
                      className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-red-50 border-red-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            {getStatusIcon(
                              sub.paymentStatus?.status || sub.status
                            )}
                            <h3 className="font-semibold text-lg text-gray-800">
                              {sub.selectedPlan?.planName}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                sub.paymentStatus?.status || sub.status
                              )}`}
                            >
                              {(
                                sub.paymentStatus?.status || sub.status
                              )?.toUpperCase()}
                            </span>
                          </div>
                          {sub.paymentStatus?.status === "rejected" &&
                            sub.paymentStatus?.rejectionReason && (
                              <div className="mb-3 p-3 bg-red-100 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-800 font-medium mb-1">
                                  Rejection Reason:
                                </p>
                                <p className="text-sm text-red-700">
                                  {sub.paymentStatus.rejectionReason}
                                </p>
                              </div>
                            )}
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              {sub.selectedPlan?.planPrice}
                            </div>
                            {sub.paymentStatus?.submissionDate && (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Submitted:{" "}
                                {formatDate(sub.paymentStatus.submissionDate)}
                              </div>
                            )}
                          </div>

                          {/* Additional Payment Details */}
                          <div className="mt-3 pt-3 border-t border-red-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-gray-600">
                              {sub.userDetails?.fullName && (
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3 h-3" />
                                  <span className="truncate">
                                    {sub.userDetails?.fullName}
                                  </span>
                                </div>
                              )}
                              {sub.userDetails?.email && (
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3 h-3" />
                                  <span className="truncate">
                                    {sub.userDetails.email}
                                  </span>
                                </div>
                              )}
                              {sub.userDetails?.phoneNumber && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  {sub.userDetails.phoneNumber}
                                </div>
                              )}
                              {sub.paymentDetails?.transactionId && (
                                <div className="flex items-center gap-2">
                                  <Hash className="w-3 h-3" />
                                  Transaction ID:{" "}
                                  {sub.paymentDetails.transactionId}
                                </div>
                              )}
                              {sub.paymentDetails?.paymentMethod && (
                                <div className="flex items-center gap-2">
                                  <Building className="w-3 h-3" />
                                  Method: {sub.paymentDetails.paymentMethod}
                                </div>
                              )}
                              {sub.paymentReceipt?.fileName && (
                              <button
                                onClick={() =>
                                  handleImageClick(
                                    sub.paymentReceipt.fileName.replace(
                                      /['",]/g,
                                      ""
                                    )
                                  )
                                }
                                className="text-blue-600 hover:underline text-xs flex items-center gap-1"
                              >
                                <FileImage className="w-3 h-3" />
                                Payment Receipt
                              </button>
                            )}
                              {sub.selectedPlan?.planDuration && (
                                <div className="flex items-center gap-2">
                                  <Hash className="w-3 h-3" />
                                  Duration: {sub.selectedPlan?.planDuration}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* No action buttons for rejected subscriptions */}
                      </div>
                    </div>
                  ))}
                  {rejected.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">
                        No Rejected Requests
                      </p>
                      <p className="text-sm mt-2">
                        Your rejected subscriptions will appear here.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "expired" && (
                <div className="space-y-4">
                  {expired.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">
                        No Expired Subscriptions
                      </p>
                      <p className="text-sm mt-2">
                        Your expired subscriptions will appear here.
                      </p>
                    </div>
                  ) : (
                    expired.map((sub) => (
                      <div
                        key={sub.id}
                        className="border rounded-lg p-6 bg-gray-50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {getStatusIcon("expired")}
                          <h3 className="font-semibold text-lg text-gray-800">
                            {sub.selectedPlan?.planName}
                          </h3>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            EXPIRED
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            {sub.selectedPlan?.planPrice}
                          </div>
                          {sub.paymentStatus?.submissionDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Started:{" "}
                              {formatDate(sub.paymentStatus.submissionDate)}
                            </div>
                          )}
                        </div>

                        {/* Additional Payment Details */}
                        <div className="mt-3 pt-3 border-t border-gray-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs text-gray-600">
                            {sub.userDetails?.fullName && (
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">
                                  {sub.userDetails?.fullName}
                                </span>
                              </div>
                            )}
                            {sub.userDetails?.email && (
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">
                                  {sub.userDetails.email}
                                </span>
                              </div>
                            )}
                            {sub.userDetails?.phoneNumber && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3" />
                                {sub.userDetails.phoneNumber}
                              </div>
                            )}
                            {sub.paymentDetails?.transactionId && (
                              <div className="flex items-center gap-2">
                                <Hash className="w-3 h-3" />
                                Transaction ID:{" "}
                                {sub.paymentDetails.transactionId}
                              </div>
                            )}
                            {sub.paymentMethod && (
                              <div className="flex items-center gap-2">
                                <Building className="w-3 h-3" />
                                Method: {sub.paymentMethod}
                              </div>
                            )}
                            {sub.paymentReceipt?.fileName && (
                              <button
                                onClick={() =>
                                  handleImageClick(
                                    sub.paymentReceipt.fileName.replace(
                                      /['",]/g,
                                      ""
                                    )
                                  )
                                }
                                className="text-blue-600 hover:underline text-xs flex items-center gap-1"
                              >
                                <FileImage className="w-3 h-3" />
                                Payment Receipt
                              </button>
                            )}
                            {sub.selectedPlan?.planDuration && (
                              <div className="flex items-center gap-2">
                                <Hash className="w-3 h-3" />
                                Duration: {sub.selectedPlan?.planDuration}
                              </div>
                            )}
                            {sub.paymentId && (
                              <div className="flex items-center gap-2">
                                <Hash className="w-3 h-3" />
                                Payment ID: {sub.paymentId}
                              </div>
                            )}
                          </div>
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
        <div className="border-t border-gray-200 p-4 bg-gray-50 text-sm text-gray-600 flex justify-between">
          <span>
            Current: {active.length} | Expired: {expired.length} | Pending:{" "}
            {pending.length} | Rejected: {rejected.length} | Total: {total}
          </span>
          <button
            onClick={fetchSubscriptions}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Refresh
          </button>
        </div>

        {imageModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden animate-fadeInUp">
              {/* Close Button */}
              <button
                onClick={() => setImageModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 bg-white rounded-full p-1 shadow"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Display */}
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
                  Payment Receipt
                </h2>
                <img
                  src={modalImageUrl}
                  alt="Payment Receipt"
                  className="w-full max-h-[70vh] object-contain rounded-lg border"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPopup;

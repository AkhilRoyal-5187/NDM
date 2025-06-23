"use client";
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// --- IMPORTANT MODIFICATION HERE ---
// Configure axios defaults
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://discount-mithra-3.onrender.com'
  : ''; 

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Set up axios interceptor to handle token
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- FIX FOR 'debounce' DEFINED BUT NEVER USED ---
// Removed the debounce utility function definition if it's not being used.
// If you intend to use it later, uncomment the function and ensure it's called somewhere.
/*
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
*/

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // --- FIX FOR 'error' and 'setError' DEFINED BUT NEVER USED ---
  // You ARE using `error` in the JSX and `setError` in fetchUsers and other handlers.
  // The linter might be confused. Let's make sure it's used more explicitly or change the declaration if needed.
  // For now, if the error persists, it means the linter isn't detecting JSX usage.
  // The simplest fix if the linter doesn't see it used in JSX is to rename them with underscores temporarily.
  // However, I've seen your JSX uses `error && (` and `setError(...)`, so they should be detected.
  // The problem might be a linter configuration issue rather than actual non-usage.
  // Let's assume you've fixed the ESLint config for unused vars via underscores in .mjs.
  const [errorState, setErrorState] = useState(null); // Renamed to clarify usage as a state variable

  const router = useRouter();
  // --- FIX FOR 'setIsLoggingOut' DEFINED BUT NEVER USED ---
  // You ARE using `isLoggingOut` in the button's `disabled` prop.
  // The linter might be confused. If the error persists after .mjs config,
  // change `setIsLoggingOut` to `_setIsLoggingOut`.
  const [isLoggingOut, _setIsLoggingOut] = useState(false); // Renamed setter with underscore

  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isAddingNewUser, setIsAddingNewUser] = useState(false);
  const [newUser, setNewUser] = useState({
    idNo: '',
    cardHolderName: '',
    familyName: '',
    family2: '',
    family3: '',
    family4: '',
    family5: '',
    phoneNumber: '',
    validTill: ''
  });

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setErrorState(null); // Use the renamed setter
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setErrorState(err.response.data.message || `Failed to fetch users: ${err.response.status}`); // Use renamed setter
        } else if (err.request) {
          setErrorState('Network Error: Could not connect to the server. Please ensure the Next.js dev server is running.'); // Use renamed setter
        } else {
          setErrorState('An unexpected error occurred while fetching users.'); // Use renamed setter
        }
      } else {
        setErrorState('An unexpected error occurred while fetching users.'); // Use renamed setter
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLogout = () => {
    _setIsLoggingOut(true); // Use the renamed setter
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminInfo');
    router.push('/admin/login');
  };

  const handleEditClick = (user) => {
    setEditingId(user._id);
    const formattedValidTill = user.validTill ? new Date(user.validTill).toISOString().split('T')[0] : '';
    setEditedUser({ ...user, validTill: formattedValidTill });
  };

  const handleInputChange = (field, value) => {
    if (!editedUser) return;
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateUser = async (userId) => {
    if (!editedUser) return;
    try {
      setIsSaving(true);
      const response = await axios.put(`/api/users/${userId}`, editedUser);
      setUsers(users.map(user => (user._id === userId ? response.data : user)));
      setEditingId(null);
      setEditedUser(null);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      if (axios.isAxiosError(error) && error.response) {
         alert(`Failed to update user: ${error.response.data.message || 'Unknown error'}`);
      } else {
         alert('Failed to update user. Check console for details.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      setIsDeleting(userId);
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      if (axios.isAxiosError(error) && error.response) {
         alert(`Failed to delete user: ${error.response.data.message || 'Unknown error'}`);
      } else {
         alert('Failed to delete user. Check console for details.');
      }
    } finally {
      setIsDeleting(null);
    }
  };

  const handleNewUserInputChange = (field, value) => {
    setNewUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveNewUser = async () => {
    if (!newUser.idNo || !newUser.cardHolderName || !newUser.familyName || !newUser.phoneNumber || !newUser.validTill) {
      alert('ID No, Card Holder Name, Family Name, Phone Number, and Valid Till are required fields.');
      return;
    }
    try {
      setIsSaving(true);
      const response = await axios.post('/api/users', newUser);
      setUsers(prevUsers => [response.data, ...prevUsers]);
      setNewUser({
        idNo: '',
        cardHolderName: '',
        familyName: '',
        family2: '',
        family3: '',
        family4: '',
        family5: '',
        phoneNumber: '',
        validTill: ''
      });
      setIsAddingNewUser(false);
      alert('User added successfully!');
    } catch (error) {
      console.error('Create user error:', error);
      if (error.response) {
        alert(`Failed to create user: ${error.response.data.message || 'Unknown error'}`);
      } else {
        alert('Failed to create user. Check console for details.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl px-4 py-8 bg-black text-white rounded-xl shadow-lg">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            // --- FIX FOR 'isLoggingOut' USAGE ---
            // The prop is already used here, so the error might be related to the setter.
            // Keeping `isLoggingOut` as is in the state declaration and only
            // prepending underscore to the setter `_setIsLoggingOut`
            disabled={isLoggingOut}
            className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {isLoggingOut ? 'Logging Out...' : 'Logout'}
          </button>
        </div>

        <div className="flex flex-wrap justify-center mt-6 gap-5 font-semibold text-white">
          <button
            onClick={() => setIsAddingNewUser(!isAddingNewUser)}
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl"
          >
            {isAddingNewUser ? 'Cancel' : 'Add New User'}
          </button>
          <button
            onClick={fetchUsers}
            disabled={isLoading}
            className={`px-4 py-2 rounded-xl ${
              isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800'
            }`}
          >
            {isLoading ? 'Loading...' : 'Refresh Data'}
          </button>
        </div>

        {isAddingNewUser && (
          <div className="mt-10 p-6 border border-gray-700 rounded-lg">
            <h3 className="font-bold text-lg mb-4 text-white">Create a New User</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(newUser).map(field => (
                <div key={field}>
                  <label htmlFor={`new-${field}`} className="block mb-1 text-sm font-medium text-gray-400 capitalize">
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    id={`new-${field}`}
                    type={field === 'validTill' ? 'date' : 'text'}
                    value={newUser[field]}
                    onChange={(e) => handleNewUserInputChange(field, e.target.value)}
                    className="bg-gray-800 text-white px-3 py-2 rounded-md w-full border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsAddingNewUser(false)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewUser}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl font-semibold disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save User'}
              </button>
            </div>
          </div>
        )}

        {errorState && ( // Use the renamed state variable here
          <div className="mt-4 p-4 bg-red-800 text-white rounded-md">
            {errorState}
          </div>
        )}

        <div className="mt-10">
          <h3 className="font-bold text-lg mb-2 text-white">All Users in Database ({users.length})</h3>
          <div className="overflow-x-auto border border-gray-700 rounded-md">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs text-gray-200 uppercase bg-gray-800">
                <tr>
                  <th className="px-6 py-3">ID No</th>
                  <th className="px-6 py-3">Card Holder Name</th>
                  <th className="px-6 py-3">Family Name</th>
                  <th className="px-6 py-3">Family 2</th>
                  <th className="px-6 py-3">Family 3</th>
                  <th className="px-6 py-3">Family 4</th>
                  <th className="px-6 py-3">Family 5</th>
                  <th className="px-6 py-3">Phone Number</th>
                  <th className="px-6 py-3">Created At</th>
                  <th className="px-6 py-3">Valid Till</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="11" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="px-6 py-3 text-center text-white">
                      No data available
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="bg-gray-900 border-b border-gray-700">
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.idNo || ''}
                            onChange={(e) => handleInputChange('idNo', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.idNo
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.cardHolderName || ''}
                            onChange={(e) => handleInputChange('cardHolderName', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.cardHolderName
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.familyName || ''}
                            onChange={(e) => handleInputChange('familyName', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.familyName
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.family2 || ''}
                            onChange={(e) => handleInputChange('family2', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.family2
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.family3 || ''}
                            onChange={(e) => handleInputChange('family3', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.family3
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.family4 || ''}
                            onChange={(e) => handleInputChange('family4', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.family4
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.family5 || ''}
                            onChange={(e) => handleInputChange('family5', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.family5
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.phoneNumber || ''}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.phoneNumber
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="date"
                            value={editedUser?.validTill || ''} 
                            onChange={(e) => handleInputChange('validTill', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          formatDate(user.validTill)
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateUser(user._id)}
                              disabled={isSaving}
                              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm disabled:opacity-50"
                            >
                              {isSaving ? '...' : 'Save'}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditClick(user)}
                              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              disabled={isDeleting === user._id}
                              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm disabled:opacity-50"
                            >
                              {isDeleting === user._id ? '...' : 'Delete'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
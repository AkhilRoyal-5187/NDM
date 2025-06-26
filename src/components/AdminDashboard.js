// src/components/AdminDashboard.js
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Configure axios defaults
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://discount-mithra-3.onrender.com'
  : 'http://localhost:3000'; // Ensure localhost base URL is set for dev

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

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Renamed _setIsLoggingOut
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isAddingNewUser, setIsAddingNewUser] = useState(false);
  
  const [newUser, setNewUser] = useState({
    idNo: '',
    cardHolderName: '',
    familyName: '',
    Family2: '', // Ensure consistent casing
    Family3: '', // Ensure consistent casing
    Family4: '', // Ensure consistent casing
    Family5: '', // Ensure consistent casing
    phoneNumber: '',
    password: '', 
    validTill: ''
  });

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setErrorState(null);
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setErrorState(err.response.data.message || `Failed to fetch users: ${err.response.status}`);
        } else if (err.request) {
          setErrorState('Network Error: Could not connect to the server. Please ensure the Next.js dev server is running.');
        } else {
          setErrorState('An unexpected error occurred while fetching users.');
        }
      } else {
        setErrorState('An unexpected error occurred while fetching users.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLogout = () => {
    setIsLoggingOut(true); // Corrected state setter
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminInfo');
    router.push('/admin/login');
  };

  const handleEditClick = (user) => {
    setEditingId(user._id);
    const formattedValidTill = user.validTill ? new Date(user.validTill).toISOString().split('T')[0] : '';
    
    // Ensure all fields are correctly initialized from the user object with proper casing
    setEditedUser({ 
      ...user, 
      validTill: formattedValidTill,
      // Ensure these match your schema's property names exactly (e.g., Family2, Family3)
      Family2: user.Family2 || '',
      Family3: user.Family3 || '',
      Family4: user.Family4 || '',
      Family5: user.Family5 || ''
    }); 
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
      // Construct the data to send. Do NOT send _id or createdAt in the payload.
      // Send only the fields that can be updated.
      const updatePayload = {
        idNo: editedUser.idNo,
        cardHolderName: editedUser.cardHolderName,
        familyName: editedUser.familyName,
        Family2: editedUser.Family2,
        Family3: editedUser.Family3,
        Family4: editedUser.Family4,
        Family5: editedUser.Family5,
        phoneNumber: editedUser.phoneNumber,
        validTill: editedUser.validTill,
        // Password is automatically managed by the backend on phoneNumber change.
        // Do not send a 'password' field from here unless explicitly editing it.
      };

      const response = await axios.put(`/api/users/${userId}`, updatePayload);
      
      // Update the users array with the response data (which should be the updated user)
      setUsers(users.map(user => (user._id === userId ? response.data : user)));
      
      setEditingId(null);
      setEditedUser(null);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      if (axios.isAxiosError(error) && error.response) {
         alert(`Failed to update user: ${error.response.data.message || 'Unknown error'}`);
         // Log the full error response from the server for debugging
         console.error('Server error response:', error.response.data);
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
    setNewUser(prev => {
      const newState = { ...prev, [field]: value };
      // If phone number is being set/changed, automatically set password to match it
      if (field === 'phoneNumber') {
        newState.password = value; 
      }
      return newState;
    });
  };

  const handleSaveNewUser = async () => {
    if (!newUser.idNo || !newUser.cardHolderName || !newUser.familyName || !newUser.phoneNumber || !newUser.validTill) {
      // Password check might not be strictly needed here if it's auto-filled from phoneNumber and backend handles hashing
      alert('ID No, Card Holder Name, Family Name, Phone Number, and Valid Till are required fields.');
      return;
    }
    try {
      setIsSaving(true);
      const response = await axios.post('/api/users', newUser);
      // Prepend the new user to the list
      setUsers(prevUsers => [response.data, ...prevUsers]); 
      setNewUser({
        idNo: '',
        cardHolderName: '',
        familyName: '',
        Family2: '',
        Family3: '',
        Family4: '',
        Family5: '',
        phoneNumber: '',
        password: '', 
        validTill: ''
      });
      setIsAddingNewUser(false);
      alert('User added successfully!');
    } catch (error) {
      console.error('Create user error:', error);
      if (axios.isAxiosError(error) && error.response) {
        alert(`Failed to create user: ${error.response.data.message || 'Unknown error'}`);
        // Log the full error response from the server for debugging
        console.error('Server error response:', error.response.data);
      } else {
        alert('Failed to create user. Check console for details.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        // Attempt to parse as ISO string first, then as a regular date
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // If parsing failed, try to construct from parts if it's just YYYY-MM-DD
            const [year, month, day] = dateString.split('-').map(Number);
            if (year && month && day) {
                return new Date(year, month - 1, day).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            }
            return 'Invalid Date';
        }
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (e) {
        console.error("Error formatting date:", dateString, e);
        return 'Error';
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl px-4 py-8 bg-black text-white rounded-xl shadow-lg">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
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
              {/* Common fields for New User */}
              {['idNo', 'cardHolderName', 'familyName', 'Family2', 'Family3', 'Family4', 'Family5', 'phoneNumber', 'validTill'].map(field => (
                <div key={`new-user-${field}`}> {/* Added more specific key */}
                  <label htmlFor={`new-${field}`} className="block mb-1 text-sm font-medium text-gray-400 capitalize">
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    id={`new-${field}`}
                    type={field === 'validTill' ? 'date' : (field === 'phoneNumber' ? 'text' : 'text')}
                    value={newUser[field]}
                    onChange={(e) => handleNewUserInputChange(field, e.target.value)}
                    className="bg-gray-800 text-white px-3 py-2 rounded-md w-full border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
              {/* Password field for new user (automatically filled with phone number) */}
              <div>
                <label htmlFor="new-password" className="block mb-1 text-sm font-medium text-gray-400 capitalize">
                  Password (Auto-filled)
                </label>
                <input
                  id="new-password"
                  type="text" 
                  value={newUser.password}
                  disabled 
                  className="bg-gray-800 text-white px-3 py-2 rounded-md w-full border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
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

        {errorState && (
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
                            value={editedUser?.Family2 || ''} 
                            onChange={(e) => handleInputChange('Family2', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.Family2 // Corrected casing
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.Family3 || ''} 
                            onChange={(e) => handleInputChange('Family3', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.Family3 // Corrected casing
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.Family4 || ''} 
                            onChange={(e) => handleInputChange('Family4', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.Family4 // Corrected casing
                        )}
                      </td>
                      <td className="px-6 py-3 text-white">
                        {editingId === user._id ? (
                          <input
                            type="text"
                            value={editedUser?.Family5 || ''} 
                            onChange={(e) => handleInputChange('Family5', e.target.value)}
                            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
                          />
                        ) : (
                          user.Family5 // Corrected casing
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
                              onClick={() => {
                                setEditingId(null);
                                setEditedUser(null); // Clear edited user state on cancel
                              }}
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
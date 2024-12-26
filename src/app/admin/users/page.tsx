'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AlertCircle, Pencil, Check, X } from 'lucide-react';
import AdminLayout from '@/components/admin/layout/AdminLayout'; // Adjust path

interface UserProfile {
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  profile: UserProfile;
  isActive: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchUsers = async () => {
  const { data } = await axios.get<User[]>(`${API_URL}/admin/users`);
  return data;
};

const updateUser = async (user: User) => {
  const { _id, ...updates } = user;
  await axios.put(`${API_URL}/admin/users/${_id}`, updates);
};

const AdminUsersPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: users, isLoading, isError, error } = useQuery('adminUsers', fetchUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [tempUserData, setTempUserData] = useState<Partial<User>>({});

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('adminUsers');
      setEditingUser(null);
    },
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setTempUserData(user);
  };

  const handleSave = () => {
    if (editingUser) {
      mutation.mutate({ ...editingUser, ...tempUserData } as User);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setTempUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading users: {(error as Error).message}</div>;

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow-md">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 border-r text-left">Username</th>
                <th className="py-2 px-4 border-r text-left">Email</th>
                <th className="py-2 px-4 border-r text-left">Role</th>
                <th className="py-2 px-4 border-r text-left">Active</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map(user => (
                <tr key={user._id} className="border-b">
                  <td className="py-2 px-4 border-r">{user.username}</td>
                  <td className="py-2 px-4 border-r">{user.email}</td>
                  <td className="py-2 px-4 border-r">
                    {editingUser?._id === user._id ? (
                      <select
                        name="role"
                        value={tempUserData.role}
                        onChange={handleInputChange}
                        className="border rounded p-1"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="py-2 px-4 border-r">
                    {editingUser?._id === user._id ? (
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={tempUserData.isActive || false}
                        onChange={(e) => setTempUserData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="mr-2"
                      />
                    ) : (
                      user.isActive ? 'Yes' : 'No'
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingUser?._id === user._id ? (
                      <div className="flex space-x-2">
                        <button onClick={handleSave} className="text-green-600 hover:text-green-800">
                          <Check className="h-4 w-4" />
                        </button>
                        <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-800">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-800">
                        <Pencil className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
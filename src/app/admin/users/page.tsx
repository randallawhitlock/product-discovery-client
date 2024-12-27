// src\app\admin\users\page.tsx
'use client';

import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import AdminLayout from '@/app/admin/layout';
import { useUsers, useUpdateUser } from '@/hooks/useUsers';
import { useAuth } from '@/hooks/useAuthToken';
import { User } from '@/types/user';
import { formatDate } from '@/utils/formatDate';

const AdminUsersPage: React.FC = () => {
  const { token } = useAuth();
  const { data: users, isLoading, isError, error } = useUsers(token);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [tempUserData, setTempUserData] = useState<Partial<User>>({});

  const updateUsersMutation = useUpdateUser(editingUser?._id || '', token!);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setTempUserData(user);
  };

  const handleSave = () => {
    if (editingUser) {
      updateUsersMutation.mutate(tempUserData);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setTempUserData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error loading users: {error?.message}</div>;

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-md shadow-md">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2 px-4 border-r dark:border-gray-700 text-left">
                  Email
                </th>
                <th className="py-2 px-4 border-r dark:border-gray-700 text-left">
                  Role
                </th>
                <th className="py-2 px-4 border-r dark:border-gray-700 text-left">
                  Active
                </th>
                <th className="py-2 px-4 border-r dark:border-gray-700 text-left">
                  Last Login
                </th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user._id}
                  className="border-b dark:border-gray-700"
                >
                  <td className="py-2 px-4 border-r dark:border-gray-700">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border-r dark:border-gray-700">
                    {editingUser?._id === user._id ? (
                      <select
                        name="role"
                        value={tempUserData.role}
                        onChange={handleInputChange}
                        className="border rounded p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="py-2 px-4 border-r dark:border-gray-700 text-center">
                    {editingUser?._id === user._id ? (
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={tempUserData.isActive || false}
                        onChange={handleInputChange}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                    ) : user.isActive ? (
                      'Yes'
                    ) : (
                      'No'
                    )}
                  </td>
                  <td className="py-2 px-4 border-r dark:border-gray-700">
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className="py-2 px-4">
                    {editingUser?._id === user._id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSave}
                          disabled={updateUsersMutation.isPending}
                          className="text-green-600 hover:text-green-800 disabled:opacity-50"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={updateUsersMutation.isPending}
                          className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
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
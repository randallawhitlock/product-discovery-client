// src\app\admin\posts\page.tsx
'use client';

import React from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Pencil, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '@/app/admin/layout';
import { formatDate } from '@/utils/formatDate'; // Import utility function

const AdminBlogPostsPage: React.FC = () => {
  const { data: blogPostsData, isLoading, isError, error } = useBlogPosts(
    1,
    10,
    'all'
  );

  if (isLoading) return <div>Loading blog posts...</div>;
  if (isError) return <div>Error loading blog posts: {error?.message}</div>;

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
          <Link
            href="/admin/posts/new"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            <PlusCircle className="h-4 w-4 mr-2 inline-block" /> Add New Post
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-md shadow-md">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2 px-4 border-r dark:border-gray-700 text-left">
                  Title
                </th>
                <th className="py-2 px-4 border-r dark:border-gray-700 text-left">
                  Status
                </th>
                <th className="py-2 px-4 border-r dark:border-gray-700 text-left">
                  Created At
                </th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogPostsData?.posts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b dark:border-gray-700"
                >
                  <td className="py-2 px-4 border-r dark:border-gray-700">
                    {post.title}
                  </td>
                  <td className="py-2 px-4 border-r dark:border-gray-700">
                    {post.status}
                  </td>
                  <td className="py-2 px-4 border-r dark:border-gray-700">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      href={`/admin/posts/${post._id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </Link>
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

export default AdminBlogPostsPage;
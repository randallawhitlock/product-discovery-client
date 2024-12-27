'use client';

import React from 'react';
import { Package, FileText, Users } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useProducts } from '@/hooks/useProducts';
import { useUsers } from '@/hooks/useUsers'; // Correct import for useUsers
import DashboardCard from '@/components/admin/dashboard/DashboardCard';
import SkeletonCard from '@/components/admin/dashboard/SkeletonCard';

const AdminDashboard: React.FC = () => {
  const {
    data: blogPostsData,
    isLoading: isBlogPostsLoading,
    error: blogPostsError,
  } = useBlogPosts(1, 5, 'published'); // Fetching only 5 recent posts

  const {
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError,
  } = useProducts(1, 5, {}); // Fetching only 5 recent products

  const {
    data: usersData,
    isLoading: isUsersLoading,
    error: usersError,
  } = useUsers(); // Fetch all users

  const stats = {
    products: productsData?.pagination.count || 0,
    posts: blogPostsData?.pagination.count || 0,
    users: usersData?.length || 0, // Use the length of the users array
  };

  if (isBlogPostsLoading || isProductsLoading || isUsersLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (blogPostsError || productsError || usersError) {
    return (
      <div>
        Error:{' '}
        {(blogPostsError || productsError || usersError)?.message?.toString() ||
          'Unknown error'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Dashboard Overview
        </h1>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Products"
          value={stats.products}
          icon={Package}
        />
        <DashboardCard
          title="Blog Posts"
          value={stats.posts}
          icon={FileText}
        />
        <DashboardCard
          title="Active Users"
          value={stats.users}
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-slate-800 dark:text-gray-100">
              Recent Products
            </h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-gray-700">
            {productsData?.products.slice(0, 3).map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-gray-100">
                      {product.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                      Added {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-slate-800 dark:text-gray-100">
              Recent Blog Posts
            </h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-gray-700">
            {blogPostsData?.posts.slice(0, 3).map((post) => (
              <div
                key={post._id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={post.author.profile.avatar}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-gray-100">
                      {post.title}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                      Published{' '}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  Edit Post
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
'use client';

import React, { useEffect, useState } from "react";
import { Package, FileText, Users } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useProducts } from "@/hooks/useProducts";
import { useUser } from "@/hooks/useUsers";
import DashboardCard from "@/components/admin/dashboard/DashboardCard";
import SkeletonCard from "@/components/admin/dashboard/SkeletonCard";

const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUserId = "someUserId"; // Replace with your actual method to get userId
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const {
    data: blogPostsData,
    isLoading: isBlogPostsLoading,
    error: blogPostsError,
  } = useBlogPosts(1, 10, "published");

  const {
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError,
  } = useProducts(1, 10, {});

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useUser(userId, token || "");

  const stats = {
    products: productsData?.pagination.count || 0,
    posts: blogPostsData?.pagination.count || 0,
    users: userData ? 10 : 0,
  };

  if (isBlogPostsLoading || isProductsLoading || isUserLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (blogPostsError || productsError || userError) {
    return (
      <div>
        Error:{" "}
        {(blogPostsError || productsError || userError)?.message?.toString() ||
          "Unknown error"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <div className="text-sm text-slate-600">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Products" value={stats.products} icon={Package} />
        <DashboardCard title="Blog Posts" value={stats.posts} icon={FileText} />
        <DashboardCard title="Active Users" value={stats.users} icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Recent Products</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {productsData?.products.slice(0, 3).map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      {product.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      Added {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Recent Blog Posts</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {blogPostsData?.posts.slice(0, 3).map((post) => (
              <div
                key={post._id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <img
                      src={post.author.profile.avatar}
                      alt={post.author.username}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{post.title}</p>
                    <p className="text-sm text-slate-500">
                      Published {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
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
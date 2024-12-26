'use client';

import React from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import BlogPostForm from '@/components/admin/forms/BlogPostForm';
import { useRouter } from 'next/navigation';

const AdminNewBlogPostPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/blog', { // Or your backend API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/admin/posts');
      } else {
        console.error('Failed to save blog post');
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Add New Blog Post</h1>
        <BlogPostForm onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default AdminNewBlogPostPage;
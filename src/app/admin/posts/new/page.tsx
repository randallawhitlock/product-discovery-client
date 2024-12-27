// src\app\admin\posts\new\page.tsx
'use client';

import React from 'react';
import AdminLayout from '@/app/admin/layout';
import BlogPostForm from '@/components/admin/forms/BlogPostForm';
import { useRouter } from 'next/navigation';
import { useAuth }  from '@/hooks/useAuthToken';
import { BlogPostFormData } from '@/types/blog';

const AdminNewBlogPostPage: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();

  const handleSubmit = async (data: BlogPostFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/admin/posts');
      } else {
        // Consider showing a user-friendly error message
        const errorData = await response.json();
        console.error('Failed to save blog post', errorData);
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
'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import BlogPostForm from '@/components/admin/forms/BlogPostForm';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const AdminEditBlogPostPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`); // Or your backend API route
        if (response.ok) {
          const data = await response.json();
          setInitialData(data);
        } else {
          console.error('Failed to fetch blog post');
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/admin/posts');
      } else {
        console.error('Failed to update blog post');
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };

  if (!initialData) {
    return <div>Loading blog post...</div>;
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
        <BlogPostForm initialData={initialData} onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default AdminEditBlogPostPage;
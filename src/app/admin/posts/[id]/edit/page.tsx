'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/app/admin/layout';
import BlogPostForm from '@/components/admin/forms/BlogPostForm';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuthToken';
import { BlogPostFormData } from '@/types/blog';

const AdminEditBlogPostPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const { id } = params;
  const [initialData, setInitialData] = useState<BlogPostFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setInitialData(data);
        } else {
          setError('Failed to fetch blog post');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Error fetching blog post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, token]);

  const handleSubmit = async (data: BlogPostFormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        router.push('/admin/posts');
      } else {
        const errorData = await response.json();
        console.error('Failed to update blog post', errorData);
        // Optionally set an error state to display to the user
      }
    } catch (err) {
      console.error('Error updating blog post:', err);
      // Optionally set an error state to display to the user
    }
  };

  if (loading) {
    return <div>Loading blog post...</div>;
  }

  if (error || !initialData) {
    return <div>Error: {error || 'Blog post not found.'}</div>;
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
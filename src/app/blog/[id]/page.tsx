'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BlogPost } from '@/types/blog';

const BlogPostDetailPage: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (isLoading) return <div>Loading blog post...</div>;
  if (isError) return <div>Error loading blog post</div>;
  if (!post) return <div>Blog post not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Published on:{' '}
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default BlogPostDetailPage;
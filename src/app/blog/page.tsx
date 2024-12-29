'use client';

import { useBlogPosts } from '@/hooks/useBlogPosts';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

const BlogPage: React.FC = () => {
  const {
    data: blogPostsData,
    isLoading,
    isError,
    error,
  } = useBlogPosts(1, 10, 'published');

  if (isLoading) return <div>Loading blog posts...</div>;
  if (isError)
    return (
      <div>
        Error loading blog posts:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogPostsData?.posts.map((post: BlogPost) => (
          <Link key={post._id} href={`/blog/${post._id}`}>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {post.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
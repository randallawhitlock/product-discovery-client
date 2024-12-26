import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: {
    _id: string;
    username: string;
    profile: {
      avatar: string;
    };
  };
  tags: string[];
  status: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  current: number;
  total: number;
  count: number;
}

interface BlogPostsResponse {
  posts: BlogPost[];
  pagination: Pagination;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const fetchBlogPosts = async (page: number, limit: number, status: string) => {
  const { data } = await axios.get<BlogPostsResponse>(
    `${API_URL}/blog?page=${page}&limit=${limit}&status=${status}`
  );
  return data;
};

export const useBlogPosts = (page: number, limit: number, status: string) => {
  return useQuery({
    queryKey: ["blogPosts", page, limit, status],
    queryFn: () => fetchBlogPosts(page, limit, status),
  });
};
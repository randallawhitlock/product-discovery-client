import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UserProfile {
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  wishlist: string[]; 
  profile: UserProfile;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const fetchUser = async (userId: string, token: string) => {
  const { data } = await axios.get<User>(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUser = (userId: string, token: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId, token),
    enabled: !!token  && !!userId,
  });
};

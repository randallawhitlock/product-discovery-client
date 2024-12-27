// src\hooks\useUsers.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import axios from 'axios';
import { User } from '@/types/user'; // Import the User type

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const fetchUsers = async (token: string): Promise<User[]> => {
  const { data } = await axios.get<User[]>(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUsers = (token?: string, options?: UseQueryOptions<User[]>) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(token!),
    enabled: !!token,
    ...options,
  });
};

const fetchUser = async (userId: string, token: string): Promise<User> => {
  const { data } = await axios.get<User>(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUser = (userId: string, token?: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId, token!),
    enabled: !!token && !!userId,
  });
};

const updateUsers = async (
  userId: string,
  userData: Partial<User>,
  token: string
): Promise<User> => {
  const { data } = await axios.patch<User>(
    `${API_URL}/users/${userId}`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useUpdateUser = (userId: string, token?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Partial<User>) =>
      updateUsers(userId, userData, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
    onError: (error) => {
      console.error('Failed to update user:', error);
    },
  });
};
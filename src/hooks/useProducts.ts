import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  affiliateLink?: string;
  category: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  current: number;
  total: number;
  count: number;
}

interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const fetchProducts = async (
  page: number,
  limit: number,
  filters: {
    category?: string[];
    minPrice?: number;
    maxPrice?: number;
    tags?: string[];
    search?: string;
  }
): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  Object.entries(filters).forEach(([key, val]) => {
    if (val) {
      if (Array.isArray(val)) {
        val.forEach((v) => params.append(key, v));
      } else {
        params.append(key, val.toString());
      }
    }
  });

  const { data } = await axios.get<ProductsResponse>(
    `${API_URL}/products?${params.toString()}`
  );
  return data;
};

export const useProducts = (
  page: number,
  limit: number,
  filters: {
    category?: string[];
    minPrice?: number;
    maxPrice?: number;
    tags?: string[];
    search?: string;
  } = {}
) => {
  return useQuery({
    queryKey: ['products', page, limit, filters],
    queryFn: () => fetchProducts(page, limit, filters),
    keepPreviousData: true,
  });
};
'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/app/admin/layout';
import ProductForm from '@/components/admin/forms/ProductForm';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuthToken';
import { ProductFormData } from '@/types/products';

const AdminEditProductPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const { id } = params;
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
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
          setError('Failed to fetch product');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, token]);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
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
        router.push('/admin/products');
      } else {
        const errorData = await response.json();
        console.error('Failed to update product', errorData);
      }
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (error || !initialData) {
    return <div>Error: {error || 'Product not found.'}</div>;
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <ProductForm initialData={initialData} onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default AdminEditProductPage;
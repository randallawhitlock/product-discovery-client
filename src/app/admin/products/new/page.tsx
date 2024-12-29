'use client';

import React from 'react';
import AdminLayout from '@/app/admin/layout';
import ProductForm from '@/components/admin/forms/ProductForm';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuthToken';
import { ProductFormData } from '@/types/products';

const AdminNewProductPage: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          method: 'POST',
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
        console.error('Failed to save product', errorData);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default AdminNewProductPage;
'use client';

import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { Pencil, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '@/app/admin/layout';

const AdminProductsPage: React.FC = () => {
  const {
    data: productsData,
    isLoading,
    isError,
    error,
  } = useProducts(1, 10, {});

  if (isLoading) return <div>Loading products...</div>;
  if (isError)
    return (
      <div>
        Error loading products:{' '}
        {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <Link
            href="/admin/products/new"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            <PlusCircle className="h-4 w-4 mr-2 inline-block" /> Add New
            Product
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-md shadow-md">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="py-2 px-4 border-r dark:border-gray-700 text-left">
                  Name
                </th>
                <th className="py-2 px-4 border-r dark:border-gray-700 text-left">
                  Category
                </th>
                <th className="py-2 px-4 border-r dark:border-gray-700 text-left">
                  Price
                </th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productsData?.products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b dark:border-gray-700"
                >
                  <td className="py-2 px-4 border-r dark:border-gray-700">
                    {product.name}
                  </td>
                  <td className="py-2 px-4 border-r dark:border-gray-700">
                    {product.category}
                  </td>
                  <td className="py-2 px-4 border-r dark:border-gray-700">
                    ${product.price}
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      href={`/admin/products/${product._id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil className="h-4 w-4" /> Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProductsPage;
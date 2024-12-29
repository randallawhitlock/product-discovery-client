'use client';

import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/products';
import Link from 'next/link';

const ProductsPage: React.FC = () => {
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productsData?.products.map((product: Product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {product.category}
              </p>
              <p className="text-gray-800 dark:text-gray-100 mt-2">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
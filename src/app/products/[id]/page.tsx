'use client';

import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/products';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (isLoading) return <div>Loading product details...</div>;
  if (isError) return <div>Error loading product details</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {product.category}
        </p>
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          ${product.price}
        </p>
        <p className="text-gray-700 dark:text-gray-200 mb-4">
          {product.description}
        </p>
        {product.affiliateLink && (
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Buy Now
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
export interface ProductFormData {
    name: string;
    description: string;
    price: string;
    category: string;
    thumbnail: string;
    affiliateLink: string;
    inStock: boolean;
  }

export interface Product {
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
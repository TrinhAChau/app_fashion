export interface Product {
  product_id?: number;

  product_name: string;

  description: string;

  quantity: number;

  price: string;

  thumnails?: string;

  create_at?: string;

  category_id?: number;

  category_name?: string;

  parent_category_name?: string;

  parent_id?: number;

  images?: string[];
}

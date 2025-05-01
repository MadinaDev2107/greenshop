import { supabase } from "../supbaseClient";

export interface Product {
  id: number;
  name: string;
  price: number;
  like: boolean;
  sale: boolean;
  categoryId: string;
  description?: string;
  image: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Order {
  id: number;
  user_id: number;
  total: number;
  created_at: string;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data;
}

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from("user").select("*");
  if (error) throw error;
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("category").select("*");
  if (error) throw error;
  return data;
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase.from("orders").select("*");
  if (error) throw error;
  return data;
}

export const addProduct = async (
  product: Product
): Promise<Product[] | null> => {
  const { data, error } = await supabase.from("products").insert([product]);
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
};

export const editProduct = async (
  id: number,
  updatedProduct: Partial<Product>
): Promise<Product[] | null> => {
  const { data, error } = await supabase
    .from("products")
    .update(updatedProduct)
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const addCategory = async (
  category: Category
): Promise<Category[] | null> => {
  const { data, error } = await supabase.from("category").insert([category]);
  if (error) throw error;
  return data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  const { error } = await supabase.from("category").delete().eq("id", id);
  if (error) throw error;
};

export const editCategory = async (
  id: number,
  updatedCategory: Partial<Category>
): Promise<Category[] | null> => {
  const { data, error } = await supabase
    .from("category")
    .update(updatedCategory)
    .eq("id", id);
  if (error) throw error;
  return data;
};

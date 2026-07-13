import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8010/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Model {
  id: number;
  name: string;
  slug: string;
  brand_id: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tutorial {
  id: number;
  title: string;
  slug: string;
  description?: string;
  brand_id?: number;
  model_id?: number;
  category_id?: number;
  difficulty?: string;
  language?: string;
  source?: string;
  official?: boolean;
  github?: string;
  youtube?: string;
  website?: string;
  author?: string;
  license?: string;
  status: string;
}

export async function listBrands(): Promise<Brand[]> {
  const { data } = await api.get("/brands");
  return data;
}

export async function listModels(brandId?: number): Promise<Model[]> {
  const { data } = await api.get("/models", { params: brandId ? { brand_id: brandId } : {} });
  return data;
}

export async function listCategories(): Promise<Category[]> {
  const { data } = await api.get("/categories");
  return data;
}

export async function listTutorials(params?: {
  search?: string;
  brand_id?: number;
  model_id?: number;
  category_id?: number;
  difficulty?: string;
  limit?: number;
  offset?: number;
}): Promise<Tutorial[]> {
  const { data } = await api.get("/tutorials", { params });
  return data;
}

export async function getTutorial(id: number): Promise<Tutorial> {
  const { data } = await api.get(`/tutorials/${id}`);
  return data;
}

export async function searchTutorials(q: string): Promise<Tutorial[]> {
  const { data } = await api.get("/search", { params: { q } });
  return data;
}

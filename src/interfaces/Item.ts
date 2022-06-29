export interface Item {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  published: boolean;
  categoryId: number;
  featured: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
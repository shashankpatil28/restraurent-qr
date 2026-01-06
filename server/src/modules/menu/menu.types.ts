export interface CreateCategoryInput {
  name: string;
  position: number;
}

export interface CreateMenuItemInput {
  name: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
}

export interface UpdateMenuItemInput {
  name?: string;
  price?: number;
  imageUrl?: string;
  isAvailable?: boolean;
}

export interface WishlistProduct {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

export interface WishlistItem {
  _id: string;
  addedAt: string;
  productID: WishlistProduct;
}

export interface WishlistResponse {
  _id: string;
  userEmail: string;
  items: WishlistItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

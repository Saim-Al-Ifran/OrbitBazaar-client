import { PaginationMeta } from "../common/pagination.types";

export interface Review {
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
}
export interface ReviewResponse {
    success: boolean;
    message: string;
    data: Review[];
    pagination: PaginationMeta;
}

export interface ReviewsParams{
    productId: string;
    page?: number;
    limit?: number;
}

export interface UserAddReviewResponse {
    success: boolean;
    message: string;
}

export interface UserAddReviewRequest {
    productId: string;
    rating: number;
    comment: string;
}

export interface UpdateReviewRequest {
  reviewId: string;
  data: {
    rating: number;
    comment: string;
  };
}

export interface UpdateReviewResponse {
  message: string;
  updatedReview: {
    _id: string;
    rating: number;
    comment: string;
    productID: string;
    userEmail: string;
    createdAt: string;
    updatedAt: string;
  };
}
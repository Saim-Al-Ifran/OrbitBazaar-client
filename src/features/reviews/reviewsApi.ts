import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import {
  ReviewResponse,
  ReviewsParams,
  UpdateReviewRequest,
  UpdateReviewResponse,
  UserAddReviewRequest,
  UserAddReviewResponse
} from "../../types/api-types/reviews/reviews.types";

const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({


    getProductsReviews: builder.query<ReviewResponse, ReviewsParams >({
      query: ({ productId, page , limit }) => ({
        url: `/reviews/${productId}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: (_result, _error, { productId }) => [
        { type: "ReviewsList", id: productId },
        "ReviewsList",
      ],
    }),
    getUserReviews: builder.query<ReviewResponse, { page: number, limit: number }>({
      query: ({ page, limit }) => ({
        url: `/reviews/user`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags:["UserReviews"]
    }),
    getUserReviewsIDs: builder.query<{ data: string[] }, void>({
      query: () => ({
        url: `/reviews/user_reviews_Id`,
        method: "GET",
      }),
      providesTags: ["UserReviewsIDs"],
    }),
     submitReview: builder.mutation<UserAddReviewResponse,UserAddReviewRequest>({
      query: (data) => ({
        url: `/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { productId }) => [
        { type: "ReviewsList", id: productId },
        "ReviewsList",
        "UserReviewsIDs",
        "UserReviews",
        "PurchasedProducts",
      ],
    }),
    updateReview: builder.mutation<UpdateReviewResponse,UpdateReviewRequest>({
      query: ({reviewId,data}) => ({
        url: `/reviews/user/${reviewId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { reviewId }) => [
        { type: "ReviewsList", id: reviewId },
        "ReviewsList",
        "UserReviewsIDs",
        "UserReviews"
      ],
    }),
    deleteReview: builder.mutation<{ success: boolean; message: string }, string>({
      query: (reviewId) => ({
        url: `/reviews/user/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, reviewId) => [
        { type: "ReviewsList", id: reviewId },
        "ReviewsList",
        "UserReviewsIDs",
        "UserReviews",
        "PurchasedProducts"
      ],
    }),
  }),
  
});
export const {
  useGetProductsReviewsQuery,
  useGetUserReviewsQuery,
  useGetUserReviewsIDsQuery,
  useSubmitReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation
} = reviewsApi;
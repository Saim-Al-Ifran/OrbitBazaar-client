import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import { ReviewResponse, ReviewsParams } from "../../types/api-types/reviews/reviews.types";

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
    }),
    getUserReviewsIDs: builder.query<{ data: string[] }, void>({
      query: () => ({
        url: `/reviews/user_reviews_Id`,
        method: "GET",
      }),
      providesTags: ["UserReviewsIDs"],
    }),
  }),
  
});
export const {
  useGetProductsReviewsQuery,
  useGetUserReviewsQuery,
  useGetUserReviewsIDsQuery,
} = reviewsApi;
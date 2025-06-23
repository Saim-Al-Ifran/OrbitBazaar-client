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


 
  }),
  
});
export const { useGetProductsReviewsQuery } = reviewsApi;
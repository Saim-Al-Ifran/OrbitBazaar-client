import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import { AddToWishlistRequest, AddToWishlistResponse, WishlistResponse } from "../../types/api-types/wishlist/wishlist.types";

const wishListApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getWishlist: builder.query<WishlistResponse,void>({
      query: () => ({
        url: "/wishlist",
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation<AddToWishlistResponse,AddToWishlistRequest>({
      query: (data) => ({
        url: `/wishlist`,
        method: "POST",
        body:data
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeAllFromWishlist: builder.mutation({
      query: () => ({
        url: `/wishlist`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    })
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useRemoveAllFromWishlistMutation,
} = wishListApi;
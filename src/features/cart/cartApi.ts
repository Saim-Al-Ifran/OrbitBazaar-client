import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { AddToCartRequest, AddToCartResponse, CartResponse, RemoveCartRequest, RemoveCartResponse, UpdateCartRequest, UpdateCartResponse } from "../../types/api-types/cart/cart.types";
import { apiSlice } from "../api/apiSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder:EndpointBuilder<BaseQueryFn, string, string>) => ({
    getCart: builder.query<CartResponse,void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<AddToCartResponse,AddToCartRequest>({
      query: (item) => ({
        url: "/cart",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartQuantity: builder.mutation<UpdateCartResponse,UpdateCartRequest>({
      query: ({ productId, quantity }) => ({
        url: `/cart/item/${productId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: builder.mutation<RemoveCartRequest,RemoveCartResponse>({
      query: (id) => ({
        url: `/cart/item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartQuantityMutation,
  useRemoveFromCartMutation,
} = cartApi;
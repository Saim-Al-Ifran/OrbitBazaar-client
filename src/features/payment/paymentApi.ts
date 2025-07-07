import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import { PaymentIntentRequest, PaymentIntentResponse } from "../../types/api-types/payment/payment.type";

const paymentApi = apiSlice.injectEndpoints({
   endpoints:(builder:EndpointBuilder<BaseQueryFn, string, string>)=>({
        paymentIntent: builder.mutation<PaymentIntentResponse,PaymentIntentRequest>({
            query: (data) => ({
                url: `/create_payment_intent`, 
                method: 'POST',  
                body: data,
            }),
        }),
        confirmPayment:builder.mutation({
            query: (data) => ({
                url: `/payment/confirm-payment`, 
                method: 'POST',  
                body: data,
            }),
        })
  }),
});

export const {
   usePaymentIntentMutation,
   useConfirmPaymentMutation
} = paymentApi;

export interface PaymentIntentRequest{
    price:number;
}

export interface PaymentIntentResponse{
    clientSecret:string;
}
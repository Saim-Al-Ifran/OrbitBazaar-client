export interface CartItem {
    productID: {
        _id: string;
        name: string;
        price: number;
        images: string[];
    };
    quantity: number;
    price: number;
    total: number;
}

export interface CartResponse {
    userEmail: string;
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

export interface AddToCartRequest {
    productId: string;
    quantity: number;
    price: number;
}
export interface AddToCartResponse {
    message: string;
    cart: CartResponse;
}

export interface UpdateCartRequest{
    productId:string;
    quantity:number;
}

export interface UpdateCartResponse extends AddToCartResponse{};

export interface RemoveCartRequest {
    id:string;
}

export interface RemoveCartResponse {
    message:string;
}
import { CartDbObject } from "generated/types"

export interface ICartService {
    getCart(userId: string): Promise<CartDbObject>

    addProductToCart(userId: string, productId: string): Promise<CartDbObject>

    updateProductQuantity(userId: string, productId: string, qty: number): Promise<CartDbObject>

    removeProductFromCart(userId: string, productId: string): Promise<CartDbObject>
}

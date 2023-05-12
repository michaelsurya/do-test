import { CartDbObject } from "generated/types"

export interface ICartRepository {
    getCart(userId: string): Promise<CartDbObject>

    addProductToCart(userId: string, productId: string): Promise<CartDbObject>

    removeProductFromCart(userId: string, productId: string): Promise<CartDbObject>

    updateProductQuantity(userId: string, productId: string, qty: number): Promise<CartDbObject>

    emptyCart(userId: string): Promise<CartDbObject>
}

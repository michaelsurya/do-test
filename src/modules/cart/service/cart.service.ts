import { inject, injectable } from "inversify";

// DI
import { TYPES } from "di/type.di";

// Interface
import { ICartRepository, ICartService } from "../cart.module";

// Type
import { CartDbObject } from "generated/types";

@injectable()
export class CartService implements ICartService {
  constructor(
    @inject(TYPES.ICartRepository) private readonly cartRepo: ICartRepository
  ) {}

  public async getCart(userId: string): Promise<CartDbObject> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      return this.cartRepo.getCart(userId);
    } catch (e: any) {
      throw e;
    }
  }

  public addProductToCart(
    userId: string,
    productId: string
  ): Promise<CartDbObject> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      return this.cartRepo.addProductToCart(userId, productId);
    } catch (e: any) {
      throw e;
    }
  }

  public updateProductQuantity(
    userId: string,
    productId: string,
    qty: number
  ): Promise<CartDbObject> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      if (qty < 0) {
        throw Error("Invalid qty");
      }

      if (qty === 0) {
        return this.cartRepo.removeProductFromCart(userId, productId);
      }

      return this.cartRepo.updateProductQuantity(userId, productId, qty);
    } catch (e: any) {
      throw e;
    }
  }

  public async removeProductFromCart(
    userId: string,
    productId: string
  ): Promise<CartDbObject> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      return this.cartRepo.removeProductFromCart(userId, productId);
    } catch (e: any) {
      throw e;
    }
  }
}

import { inject, injectable } from "inversify";

// Data
import { IProductDataSource, IUserDataSource } from "data/index.data";

// DI
import { TYPES } from "di/type.di";

// Interface
import { ICartRepository } from "modules/cart/interface/cart.repository";

// Type
import {
  CartDbObject,
  CartItemDbObject,
  ProductDbObject,
  UserDbObject,
} from "generated/types";

@injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @inject(TYPES.IUserDataSource) private readonly userDs: IUserDataSource,
    @inject(TYPES.IProductDataSource)
    private readonly productDs: IProductDataSource
  ) {}

  public async getCart(userId: string): Promise<CartDbObject> {
    try {
      const user: UserDbObject | null = await this.userDs.getUser(userId);

      if (!user) {
        throw Error("User not found");
      }

      return user.cart;
    } catch (e: any) {
      throw e;
    }
  }

  public async addProductToCart(
    userId: string,
    productId: string
  ): Promise<CartDbObject> {
    try {
      const cart: CartDbObject = await this.getCart(userId);

      const product: ProductDbObject = await this.productDs.getProduct(
        productId
      );

      let isProductExistInCart = false;

      const cartItem: CartItemDbObject[] = cart.items?.map((item) => {
        if (item._id.toString() === productId) {
          isProductExistInCart = true;

          const newQty = item.qty + 1;

          return {
            ...item,
            name: product.name,
            price: product.price,
            qty: newQty,
            totalPrice: newQty * product.price,
          };
        }

        return item;
      });

      if (!isProductExistInCart) {
        cartItem.push({
          ...product,
          qty: 1,
          totalPrice: product.price,
        });
      }

      const updatedCart = {
        items: cartItem,
        totalAmount: cartItem.reduce(
          (total, item) => total + item.totalPrice,
          0
        ),
      };

      const updatedUser = await this.userDs.editUser(userId, { cart: updatedCart });

      return updatedUser.cart;
    } catch (e: any) {
      throw e;
    }
  }

  public async removeProductFromCart(userId: string, productId: string): Promise<CartDbObject> {
    try {
      const cart: CartDbObject = await this.getCart(userId);

      const cartItem: CartItemDbObject[] = cart.items?.filter((item) => item._id.toString() !== productId);

      const newCart = {
        items: cartItem,
        totalAmount: cartItem.reduce(
          (total, item) => total + item.totalPrice,
          0
        ),
      };

      const newUser = await this.userDs.editUser(userId, { cart: newCart });

      return newUser.cart;
    } catch (e: any) {
      throw e;
    }
  }

  public async updateProductQuantity(userId: string, productId: string, qty: number): Promise<CartDbObject> {
    try {
      const cart: CartDbObject = await this.getCart(userId);

      const product: ProductDbObject = await this.productDs.getProduct(
        productId
      );

      let isProductExistInCart = false;

      const cartItem: CartItemDbObject[] = cart.items?.map((item) => {
        if (item._id.toString() === productId) {
          isProductExistInCart = true;

          const newQty = qty;

          return {
            ...item,
            name: product.name,
            price: product.price,
            qty: newQty,
            totalPrice: newQty * product.price,
          };
        }

        return item;
      });

      // Product does not exist in the currect cart
      if (!isProductExistInCart) {
        throw Error("Product doesn't exist in the current cart")
      }

      const updatedCart = {
        items: cartItem,
        totalAmount: cartItem.reduce(
          (total, item) => total + item.totalPrice,
          0
        ),
      };

      const updatedUser = await this.userDs.editUser(userId, { cart: updatedCart });

      return updatedUser.cart;
    } catch (e: any) {
      throw e;
    }
  }

  public async emptyCart(userId: string): Promise<CartDbObject> {
    try {
      const newCart: CartDbObject = {
        items: [],
        totalAmount: 0
      }

      const updatedUser = await this.userDs.editUser(userId, { cart: newCart });

      return updatedUser.cart
    } catch (e: any) {
      throw e;
    }
  }
}

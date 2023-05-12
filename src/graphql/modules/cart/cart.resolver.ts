import {
  CartItemDbObject,
  CartUpdateInput,
  MutationAddProductToCartArgs,
  MutationRemoveProductFromCartArgs,
  MutationUpdateCartItemQuantityArgs,
} from "generated/types";
import { IContext } from "graphql/interface/context";

const resolver = {
  Query: {
    myCart: async (_: any, __: any, { userId, cartService }: IContext) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      return await cartService.getCart(userId);
    },
  },
  Mutation: {
    addProductToCart: async (
      _: any,
      { productId }: MutationAddProductToCartArgs,
      { userId, cartService }: IContext
    ) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      return await cartService.addProductToCart(userId, productId);
    },

    removeProductFromCart: async (
      _: any,
      { productId }: MutationRemoveProductFromCartArgs,
      { userId, cartService }: IContext
    ) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      return await cartService.removeProductFromCart(userId, productId);
    },

    updateCartItemQuantity
    : async (
      _: any,
      { input }: MutationUpdateCartItemQuantityArgs,
      { userId, cartService }: IContext
    ) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      const { productId, qty }: CartUpdateInput = input;

      return await cartService.updateProductQuantity(userId, productId, qty);
    },
  },
  CartItem: {
    id: (c: CartItemDbObject) => c._id,
  },
};

export default resolver;

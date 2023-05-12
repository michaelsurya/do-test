import {
  MutationCreateOrderArgs,
  OrderDbObject,
  OrderItemDbObject,
  QueryOrderArgs,
} from "generated/types";
import { IContext } from "graphql/interface/context";

const resolvers = {
  Query: {
    myOrder: async (_: any, __: any, { userId, orderService }: IContext) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      const x = await orderService.getOrders(userId)

      return orderService.getOrders(userId);
    },
    order: async (
      _: any,
      { orderId }: QueryOrderArgs,
      { userId, orderService }: IContext
    ) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      return orderService.getOrder(userId, orderId);
    },
  },
  Mutation: {
    createOrder: async (
      _: any,
      { addressId }: MutationCreateOrderArgs,
      { userId, orderService }: IContext
    ) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      return orderService.newOrder(userId, addressId);
    },
  },
  Order: {
    id: (o: OrderDbObject) => o._id,
  },
  OrderItem: {
    id: (o: OrderItemDbObject) => o._id,
  },
};

export default resolvers;

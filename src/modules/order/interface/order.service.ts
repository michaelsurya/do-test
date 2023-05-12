import { OrderDbObject } from "generated/types";

export interface IOrderService {
  getOrders(userId: string): Promise<OrderDbObject[]>;

  getOrder(userId: string, orderId: string): Promise<OrderDbObject>;

  newOrder(userId: string, addressId: string): Promise<string>;
}

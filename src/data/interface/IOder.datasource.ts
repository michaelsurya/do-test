import { OrderDbObject } from "generated/types";

export interface IOrderDatasource {
  getOrders(userId: string): Promise<OrderDbObject[]>;

  getOrderById(id: string): Promise<OrderDbObject | null>;

  createOrder(userId: string, order: Omit<OrderDbObject, "_id" | "user">, session?: any): Promise<string>;
}

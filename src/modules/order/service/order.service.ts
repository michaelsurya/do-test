import { inject, injectable } from "inversify";

// DI
import { TYPES } from "di/type.di";

// Interface
import { IOrderRepository, IOrderService } from "modules/order/order.module";

// Type
import { OrderDbObject } from "generated/types";

@injectable()
export class OrderService implements IOrderService {
  constructor(
    @inject(TYPES.IOrderRepository)
    private readonly orderRepo: IOrderRepository
  ) {}

  public async getOrder(
    userId: string,
    orderId: string
  ): Promise<OrderDbObject> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      return this.orderRepo.getOrder(userId, orderId);
    } catch (e: any) {
      throw e;
    }
  }

  public async getOrders(userId: string): Promise<OrderDbObject[]> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      return this.orderRepo.getOrders(userId);
    } catch (e: any) {
      throw e;
    }
  }

  public async newOrder(userId: string, addressId: string): Promise<string> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      return this.orderRepo.newOrder(userId, addressId);
    } catch (e: any) {
      throw e;
    }
  }
}

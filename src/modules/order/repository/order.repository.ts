import { inject, injectable } from "inversify";

// Data
import {
  IAddressDataSource,
  IDatabaseConnection,
  IOrderDatasource,
  IUserDataSource,
} from "data/index.data";

// DI
import { TYPES } from "di/type.di";

// Interface
import { IOrderRepository } from "modules/order/order.module";

// Type
import {
  CartDbObject,
  OrderDbObject,
  OrderStatus,
  UserDbObject,
} from "generated/types";

@injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @inject(TYPES.IDatabaseConnection) private readonly db: IDatabaseConnection,
    @inject(TYPES.IUserDataSource) private readonly userDs: IUserDataSource,
    @inject(TYPES.IAddressDataSource)
    private readonly addressDs: IAddressDataSource,
    @inject(TYPES.IOrderDataSource) private readonly orderDs: IOrderDatasource
  ) {}

  public async getOrders(userId: string): Promise<OrderDbObject[]> {
    try {
      return await this.orderDs.getOrders(userId);
    } catch (e: any) {
      throw e;
    }
  }

  public async getOrder(
    userId: string,
    orderId: string
  ): Promise<OrderDbObject> {
    try {
      const order: OrderDbObject | null = await this.orderDs.getOrderById(
        orderId
      );

      if (!order) {
        throw Error("Order not found");
      }

      if (order.user.toString() !== userId) {
        throw Error("You are not allowed to see this order");
      }

      return order;
    } catch (e: any) {
      throw e;
    }
  }

  public async newOrder(userId: string, addressId: string): Promise<string> {
    try {
      // Get User
      const user: UserDbObject | null = await this.userDs.getUser(userId);

      if (!user) {
        throw Error("User not found");
      }

      // Get Cart
      const cart: CartDbObject = user.cart;

      if (cart.items.length === 0) {
        throw Error("Empty cart! You can't make order");
      }

      // Get Address
      const address = await this.addressDs.getAddress(addressId);

      if (!address || address.user.toString() !== userId) {
        throw Error("Invalid Address");
      }

      const newOder: Omit<OrderDbObject, "_id" | "user"> = {
        items: cart.items,
        amount: cart.totalAmount,
        address: address._id,
        status: OrderStatus.WAITING,
      };

      // DB Trx
      const session = await this.db.getSession();

      const trxResult = await this.db.doTransaction(async () => {
        // Empty cart
        await this.userDs.editUser(
          userId,
          {
            cart: { items: [], totalAmount: 0 },
          },
          session
        );

        // Create Order
        const orderId = await this.orderDs.createOrder(
          userId,
          newOder,
          session
        );
      });

      return "true";
    } catch (e: any) {
      throw e;
    }
  }
}

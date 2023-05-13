import { injectable, inject } from "inversify";

import { TYPES } from "di/type.di";

import { IDatabaseConnection, IOrderDatasource } from "data/index.data";
import { OrderDbObject } from "generated/types";
import {
  AggregationCursor,
  ClientSession,
  Collection,
  Db,
  ObjectId,
} from "mongodb";

@injectable()
export class OrderDataSource implements IOrderDatasource {
  constructor(
    @inject(TYPES.IDatabaseConnection)
    private readonly dbConnection: IDatabaseConnection
  ) {}

  private async getCollection(): Promise<Collection<OrderDbObject>> {
    const db: Db = await this.dbConnection.getDb();
    return db.collection("order");
  }

  public async getOrders(userId: string): Promise<OrderDbObject[]> {
    try {
      const collection: Collection<OrderDbObject> = await this.getCollection();

      const cursor = collection.aggregate<OrderDbObject>([
        {
          $match: { user: new ObjectId(userId) },
        },
        {
          $lookup: {
            from: "address",
            localField: "address",
            foreignField: "_id",
            as: "address",
          },
        },
        { $unwind: "$address" },
      ]);

      return await cursor.toArray();
    } catch (e: any) {
      throw e;
    }
  }

  public async getOrderById(id: string): Promise<OrderDbObject | null> {
    try {
      const collection: Collection<OrderDbObject> = await this.getCollection();

      const cursor: AggregationCursor<OrderDbObject> =
        collection.aggregate<OrderDbObject>([
          {
            $match: { _id: new ObjectId(id) },
          },
          { $limit: 1 },
          {
            $lookup: {
              from: "address",
              localField: "address",
              foreignField: "_id",
              as: "address",
            },
          },
          { $unwind: "$address" },
        ]);

      return cursor.next();
    } catch (e: any) {
      throw e;
    }
  }

  public async createOrder(
    userId: string,
    order: Omit<OrderDbObject, "_id" | "user">,
    session: ClientSession | undefined
  ): Promise<string> {
    try {
      const collection: Collection<OrderDbObject> = await this.getCollection();

      const { acknowledged, insertedId } = await collection.insertOne(
        {
          ...order,
          _id: new ObjectId(),
          user: new ObjectId(userId),
        },
        session && { session }
      );

      if (!acknowledged) {
        throw new Error("Create order failed");
      }

      return insertedId.toString();
    } catch (e: any) {
      throw e;
    }
  }
}

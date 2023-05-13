import { injectable, inject } from "inversify";

import { TYPES } from "di/type.di";

import { IAddressDataSource, IDatabaseConnection } from "data/index.data";
import { AddressDbObject } from "generated/types";
import { ClientSession, Collection, Db, ObjectId } from "mongodb";

@injectable()
export class AddressDataSource implements IAddressDataSource {
  constructor(
    @inject(TYPES.IDatabaseConnection)
    private readonly dbConnection: IDatabaseConnection
  ) {}

  private async getCollection(): Promise<Collection<AddressDbObject>> {
    const db: Db = await this.dbConnection.getDb();
    return db.collection("address");
  }

  public async getAddressByUserId(userId: string): Promise<AddressDbObject[]> {
    try {
      const collection: Collection<AddressDbObject> =
        await this.getCollection();

      const cursor = collection.find<AddressDbObject>({
        user: new ObjectId(userId),
      });

      return await cursor.toArray();
    } catch (e: any) {
      throw e;
    }
  }

  public async getAddress(id: string): Promise<AddressDbObject | null> {
    try {
      const collection: Collection<AddressDbObject> =
        await this.getCollection();

      const result = await collection.findOne<AddressDbObject | null>({
        _id: new ObjectId(id),
      });

      return result;
    } catch (e: any) {
      throw e;
    }
  }

  public async createAddress(
    userId: string,
    address: Omit<AddressDbObject, "_id" | "user">,
    session: ClientSession | undefined
  ): Promise<string> {
    try {
      const collection: Collection<AddressDbObject> =
        await this.getCollection();

      const { acknowledged, insertedId } = await collection.insertOne(
        {
          ...address,
          _id: new ObjectId(),
          user: new ObjectId(userId),
        },
        session && { session }
      );

      if (!acknowledged) {
        throw new Error("Create address failed");
      }

      return insertedId.toString();
    } catch (e: any) {
      throw e;
    }
  }

  public async editAddress(
    addressId: string,
    address: Omit<AddressDbObject, "_id" | "user">,
    session: ClientSession | undefined
  ): Promise<AddressDbObject> {
    try {
      const collection: Collection<AddressDbObject> =
        await this.getCollection();

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(addressId) },
        {
          $set: {
            ...address,
          },
        },
        { returnDocument: "after", ...(session && { session }) }
      );

      if (!result) {
        throw new Error("Create user failed");
      }

      return result.value as AddressDbObject;
    } catch (e: any) {
      throw e;
    }
  }

  public async deleteAddress(addressId: string): Promise<Boolean> {
    try {
      const collection: Collection<AddressDbObject> =
        await this.getCollection();

      const { acknowledged, deletedCount } = await collection.deleteOne({
        _id: new ObjectId(addressId),
      });

      return deletedCount > 0;
    } catch (e: any) {
      throw e;
    }
  }
}

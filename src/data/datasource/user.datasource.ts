import { injectable, inject } from "inversify";

import { TYPES } from "di/type.di";

import { IDatabaseConnection, IUserDataSource } from "data/index.data";
import { UserDbObject } from "generated/types";
import { ClientSession, Collection, Db, ObjectId } from "mongodb";

@injectable()
export class UserDataSource implements IUserDataSource {
  constructor(
    @inject(TYPES.IDatabaseConnection)
    private readonly dbConnection: IDatabaseConnection
  ) {}

  private async getCollection(): Promise<Collection<UserDbObject>> {
    const db: Db = await this.dbConnection.getDb();
    return db.collection("user");
  }

  public async getUserByFirebaseId(
    firebaseId: string
  ): Promise<UserDbObject | null> {
    try {
      const collection: Collection<UserDbObject> = await this.getCollection();

      const result = await collection.findOne<UserDbObject | null>({
        firebaseId,
      });

      return result;
    } catch (e: any) {
      throw e;
    }
  }

  public async getUser(id: string): Promise<UserDbObject | null> {
    try {
      const collection: Collection<UserDbObject> = await this.getCollection();

      const result = await collection.findOne<UserDbObject | null>({
        _id: new ObjectId(id),
      });

      return result;
    } catch (e: any) {
      throw e;
    }
  }

  public async createUser(
    user: UserDbObject,
    session: ClientSession | undefined
  ): Promise<string> {
    try {
      const collection: Collection<UserDbObject> = await this.getCollection();

      const { acknowledged, insertedId } = await collection.insertOne(
        user,
        session && { session }
      );

      if (!acknowledged) {
        throw new Error("Create user failed");
      }

      return insertedId.toString();
    } catch (e: any) {
      throw e;
    }
  }

  public async editUser(
    userId: string,
    user: Partial<UserDbObject>,
    session: ClientSession | undefined
  ): Promise<UserDbObject> {
    try {
      const collection: Collection<UserDbObject> = await this.getCollection();

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            ...user,
          },
        },
        { returnDocument: "after", ...(session && { session }) }
      );

      if (!result) {
        throw new Error("Create user failed");
      }

      return result.value as UserDbObject;
    } catch (e: any) {
      throw e;
    }
  }
}

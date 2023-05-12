import { injectable, inject } from "inversify";

import { TYPES } from "di/type.di";

import { IDatabaseService, IProductDataSource } from "data/index.data";
import { ProductDbObject } from "generated/types";
import { Collection, Db, ObjectId } from "mongodb";

@injectable()
export class ProductDataSource implements IProductDataSource {
  constructor(
    @inject(TYPES.IDatabaseService) private readonly dbService: IDatabaseService
  ) {}

  private async getCollection(): Promise<Collection<ProductDbObject>> {
    try {
      const db: Db = await this.dbService.getDb();
      return db.collection("product");
    } catch (e: any) {
      throw e;
    }
  }

  public async getProducts(): Promise<ProductDbObject[]> {
    try {
      const collection: Collection<ProductDbObject> =
        await this.getCollection();

      return collection.find<ProductDbObject>({}).toArray();
    } catch (e: any) {
      throw e;
    }
  }

  public async getProduct(id: string): Promise<ProductDbObject> {
    try {
      const collection: Collection<ProductDbObject> =
        await this.getCollection();

      const result = await collection.findOne<ProductDbObject | null>({
        _id: new ObjectId(id),
      });

      if (!result) {
        throw new Error("Invalid Product Id");
      }

      return result as ProductDbObject;
    } catch (e: any) {
      throw e;
    }
  }
}

import { inject, injectable } from "inversify";

// Data
import { IProductDataSource } from "data/index.data";

// DI
import { TYPES } from "di/type.di";

// Interface
import { IProductRepository } from "modules/product/interface/product.repository";

// Type
import { ProductDbObject } from "generated/types";

@injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @inject(TYPES.IProductDataSource) private readonly productDs: IProductDataSource
  ) {}

  public async retrive(): Promise<ProductDbObject[]> {
    try {
      return this.productDs.getProducts()
    } catch (error: any) {
      throw error
    }
  }

  public async retrieveById(id: string): Promise<ProductDbObject> {
    try {
      return this.productDs.getProduct(id)
    } catch (error: any) {
      throw error
    }
  }
}

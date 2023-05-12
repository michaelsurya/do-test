import { ProductDbObject } from "generated/types"

export interface IProductRepository {
    retrive(): Promise<ProductDbObject[]>;

    retrieveById(id: string): Promise<ProductDbObject>
}

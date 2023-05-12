import {ProductDbObject} from "generated/types"

export interface IProductDataSource {
    getProducts(): Promise<ProductDbObject[]>

    getProduct(id: string): Promise<ProductDbObject>
}
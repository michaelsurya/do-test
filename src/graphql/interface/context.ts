import { IAuthService } from "modules/auth/auth.module";
import { IProductRepository } from "modules/product/interface/product.repository";
import { IContextProvider } from "./context.provider";

export interface IContext extends IContextProvider {
  userId?: string | null;
}

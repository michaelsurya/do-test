import { inject, injectable } from "inversify";

import { IContextProvider } from "graphql/interface/context.provider";
import { IProductRepository } from "modules/product/product.module";

import { TYPES } from "di/type.di";
import { IAuthService } from "modules/auth/auth.module";
import { ICartService } from "modules/cart/cart.module";
import { IAddressService } from "modules/address/address.module";
import { IOrderService } from "modules/order/order.module";

@injectable()
export class ContextProvider implements IContextProvider {
  @inject(TYPES.IProductRepository)
  public productRepository: IProductRepository;

  @inject(TYPES.IAddressService)
  public addressService: IAddressService;

  @inject(TYPES.IAuthService)
  public authService: IAuthService;

  @inject(TYPES.ICartService)
  public cartService: ICartService;

  @inject(TYPES.IOrderService)
  public orderService: IOrderService;
}

import { IAddressService } from "modules/address/address.module";
import { IAuthService } from "modules/auth/auth.module";
import { ICartService } from "modules/cart/cart.module";
import { IOrderService } from "modules/order/order.module";
import { IProductRepository } from "modules/product/interface/product.repository";

export interface IContextProvider {
  productRepository: IProductRepository;
  addressService: IAddressService;
  authService: IAuthService;
  cartService: ICartService;
  orderService: IOrderService;
}

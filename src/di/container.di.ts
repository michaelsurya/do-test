import { Container } from "inversify";

import { TYPES } from "./type.di";

// Graphql Context Provider Import
import { IContextProvider } from "graphql/interface/context.provider";
import { ContextProvider } from "graphql/provider/context.provider";

// Data Layer Import
import {
  IAddressDataSource,
  IAuthDataSource,
  IDatabaseService,
  IFirebaseService,
  IOrderDatasource,
  IProductDataSource,
  IUserDataSource,
  AddressDataSource,
  AuthDataSource,
  FirebaseService,
  MongoDbService,
  OrderDataSource,
  ProductDataSource,
  UserDataSource,
} from "data/index.data";

// Address Import
import {
  AddressRepository,
  AddressService,
  IAddressRepository,
  IAddressService,
} from "modules/address/address.module";

// Auth Import
import {
  IAuthRepository,
  IAuthService,
  AuthRepository,
  AuthService,
} from "modules/auth/auth.module";

// Cart Import
import {
  CartRepository,
  CartService,
  ICartRepository,
  ICartService,
} from "modules/cart/cart.module";

// Product Import
import {
  IProductRepository,
  ProductRepository,
} from "modules/product/product.module";
import {
  IOrderRepository,
  IOrderService,
  OrderRepository,
  OrderService,
} from "modules/order/order.module";

const container = new Container();

// Graphql Context Bind
container.bind<IContextProvider>(TYPES.IContextProvider).to(ContextProvider);

// Data Service Bind
container.bind<IFirebaseService>(TYPES.IFirebaseService).to(FirebaseService);
container.bind<IDatabaseService>(TYPES.IDatabaseService).to(MongoDbService);

// Address Bind
container
  .bind<IAddressDataSource>(TYPES.IAddressDataSource)
  .to(AddressDataSource);
container
  .bind<IAddressRepository>(TYPES.IAddressRepository)
  .to(AddressRepository);
container.bind<IAddressService>(TYPES.IAddressService).to(AddressService);

// Auth Bind
container.bind<IAuthDataSource>(TYPES.IAuthDataSource).to(AuthDataSource);
container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);

// Cart Bind
container.bind<ICartRepository>(TYPES.ICartRepository).to(CartRepository);
container.bind<ICartService>(TYPES.ICartService).to(CartService);

// Order Bind
container.bind<IOrderDatasource>(TYPES.IOrderDataSource).to(OrderDataSource);
container.bind<IOrderRepository>(TYPES.IOrderRepository).to(OrderRepository);
container.bind<IOrderService>(TYPES.IOrderService).to(OrderService);

// Product Bind
container
  .bind<IProductDataSource>(TYPES.IProductDataSource)
  .to(ProductDataSource);
container
  .bind<IProductRepository>(TYPES.IProductRepository)
  .to(ProductRepository);

// User Bind
container.bind<IUserDataSource>(TYPES.IUserDataSource).to(UserDataSource);

export default container;

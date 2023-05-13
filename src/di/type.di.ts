export const TYPES = {
  IContextProvider: Symbol.for("IContextProvider"),
  IDatabaseConnection: Symbol.for("IDatabaseConnection"),
  IFirebaseConnection: Symbol.for("IFirebaseConnection"),

  IAddressDataSource: Symbol.for("IAddressDataSource"),
  IAddressRepository: Symbol.for("IAddressRepository"),
  IAddressService: Symbol.for("IAddressService"),

  IAuthDataSource: Symbol.for("IAuthDataSource"),
  IAuthRepository: Symbol.for("IAuthRepository"),
  IAuthService: Symbol.for("IAuthService"),

  ICartRepository: Symbol.for("ICartRepository"),
  ICartService: Symbol.for("ICartService"),

  IOrderDataSource: Symbol.for("IOrderDataSource"),
  IOrderRepository: Symbol.for("IOrderRepository"),
  IOrderService: Symbol.for("IOrderService"),

  IProductDataSource: Symbol.for("IProductDataSource"),
  IProductRepository: Symbol.for("IProductRepository"),

  IUserDataSource: Symbol.for("IUserDataSource"),
};

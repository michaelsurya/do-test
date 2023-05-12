import { mergeResolvers } from "@graphql-tools/merge";

import AddressResolver from "./modules/address/address.resolver"
import AuthResolver from "./modules/auth/auth.resolver";
import CartResolver from "./modules/cart/cart.resolver"
import OrderResolver from "./modules/order/order.resolver"
import ProductResolver from "./modules/product/product.resolver";

export default mergeResolvers([AddressResolver, AuthResolver, CartResolver, OrderResolver, ProductResolver]);

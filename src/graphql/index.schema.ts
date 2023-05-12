import gql from "graphql-tag";
import { mergeTypeDefs } from "@graphql-tools/merge";

import AddressSchema from "./modules/address/address.schema";
import AuthSchema from "./modules/auth/auth.schema";
import CartSchema from "./modules/cart/cart.schema";
import OrderSchema from "./modules/order/order.schema";
import ProductSchema from "./modules/product/product.schema";
import UserSchema from "./modules/user/user.schema";

const BaseSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

export default mergeTypeDefs([
  BaseSchema,
  AddressSchema,
  AuthSchema,
  CartSchema,
  OrderSchema,
  ProductSchema,
  UserSchema,
]);

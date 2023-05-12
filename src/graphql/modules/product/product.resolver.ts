import { ProductDbObject, Resolvers } from "generated/types";

import { IContext } from "graphql/interface/context";

const resolvers = {
  Query: {
    products: async (
      _: any,
      __: any,
      { productRepository }: IContext,
      ___: any
    ): Promise<ProductDbObject[]> => {
      return await productRepository.retrive();
    },
  },
  Product: {
    id: (p: ProductDbObject) => p._id,
  },
};

export default resolvers;

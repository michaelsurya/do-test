import {
  AddressDbObject,
  MutationAddAddressArgs,
  MutationDeleteAddressArgs,
  MutationEditAddressArgs,
} from "generated/types";
import { IContext } from "graphql/interface/context";

const resolver = {
  Query: {
    myAddress: async (
      _: any,
      __: any,
      { userId, addressService }: IContext
    ) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      return addressService.getAddresses(userId);
    },
  },
  Mutation: {
    addAddress: async (
      _: any,
      { input }: MutationAddAddressArgs,
      { userId, addressService }: IContext
    ) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      return addressService.newAddress(userId, input);
    },

    editAddress: async (
      _: any,
      { addressId, input }: MutationEditAddressArgs,
      { userId, addressService }: IContext
    ) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      return addressService.updateAddress(userId, addressId, input);
    },

    deleteAddress: async (
      _: any,
      { addressId }: MutationDeleteAddressArgs,
      { userId, addressService }: IContext
    ) => {
      if (!userId) {
        throw Error("Unauthorized");
      }

      return addressService.deleteAddress(userId, addressId);
    },
  },
  Address: {
    id: (a: AddressDbObject) => a._id,
  },
};

export default resolver;

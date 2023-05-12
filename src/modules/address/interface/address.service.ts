import { AddressDbObject } from "generated/types";

export interface IAddressService {
  getAddresses(userId: String): Promise<AddressDbObject[]>;

  newAddress(
    userId: string,
    address: Omit<AddressDbObject, "_id" | "user">
  ): Promise<string>;

  updateAddress(
    userId: string,
    addressId: string,
    address: Partial<AddressDbObject>
  ): Promise<AddressDbObject>;

  deleteAddress(userId: string, addressId: string): Promise<Boolean>;
}

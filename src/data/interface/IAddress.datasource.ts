import { Address, AddressDbObject, UserDbObject } from "generated/types";

export interface IAddressDataSource {
  getAddressByUserId(userId: string): Promise<AddressDbObject[]>;

  getAddress(id: string): Promise<AddressDbObject | null>;

  createAddress(userId: string, address: Omit<AddressDbObject, "_id" | "user">, session?: any): Promise<string>;

  editAddress(addressId: string, address: Omit<AddressDbObject, "_id" | "user">, session?: any): Promise<AddressDbObject>;

  deleteAddress(addressId: string): Promise<Boolean>;
}

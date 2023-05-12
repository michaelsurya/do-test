import { inject, injectable } from "inversify";

// Data
import { IAddressDataSource, IUserDataSource } from "data/index.data";

// DI
import { TYPES } from "di/type.di";

// Interface
import { IAddressRepository } from "modules/address/address.module";

// Type
import { AddressDbObject, UserDbObject } from "generated/types";

@injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @inject(TYPES.IUserDataSource) private readonly userDs: IUserDataSource,
    @inject(TYPES.IAddressDataSource)
    private readonly addressDs: IAddressDataSource
  ) {}

  public async getAddresses(userId: string): Promise<AddressDbObject[]> {
    try {
      return await this.addressDs.getAddressByUserId(userId);
    } catch (e: any) {
      throw e;
    }
  }

  public async newAddress(
    userId: string,
    address: Omit<AddressDbObject, "_id" | "userId">
  ): Promise<string> {
    try {
      const user: UserDbObject | null = await this.userDs.getUser(userId);

      if (!user) {
        throw Error("User not found");
      }

      return await this.addressDs.createAddress(userId, address);
    } catch (e: any) {
      throw e;
    }
  }

  public async updateAddress(
    userId: string,
    addressId: string,
    address: Omit<AddressDbObject, "_id" | "user">
  ): Promise<AddressDbObject> {
    try {
      const user: UserDbObject | null = await this.userDs.getUser(userId);

      if (!user) {
        throw Error("User not found");
      }

      const currentAddress: AddressDbObject | null = await this.addressDs.getAddress(
        addressId
      );

      if (!currentAddress) {
        throw Error("Address not found");
      }

      return await this.addressDs.editAddress(addressId, address);
    } catch (e: any) {
      throw e;
    }
  }

  public async deleteAddress(
    userId: string,
    addressId: string
  ): Promise<Boolean> {
    try {
      const user: UserDbObject | null = await this.userDs.getUser(userId);

      if (!user) {
        throw Error("User not found");
      }

      const address: AddressDbObject | null = await this.addressDs.getAddress(
        addressId
      );

      if (!address) {
        throw Error("Address not found");
      }

      if (address.user.toString() !== userId) {
        throw Error("You are not authorized to delete this address");
      }

      return await this.addressDs.deleteAddress(addressId);
    } catch (e: any) {
      throw e;
    }
  }
}

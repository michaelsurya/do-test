import { inject, injectable } from "inversify";

// DI
import { TYPES } from "di/type.di";

// Interface
import { IAddressRepository, IAddressService } from "modules/address/address.module";

// Type
import { AddressDbObject } from "generated/types";

@injectable()
export class AddressService implements IAddressService {
  constructor(
    @inject(TYPES.IAddressRepository)
    private readonly addressRepo: IAddressRepository
  ) {}

  public async getAddresses(userId: String): Promise<AddressDbObject[]> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      return this.addressRepo.getAddresses(userId);
    } catch (e: any) {
      throw e;
    }
  }

  public async newAddress(
    userId: string,
    address: Omit<AddressDbObject, "_id">
  ): Promise<string> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      return this.addressRepo.newAddress(userId, address);
    } catch (e: any) {
      throw e;
    }
  }

  public async updateAddress(
    userId: string,
    addressId: string,
    address: Partial<AddressDbObject>
  ): Promise<AddressDbObject> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      return this.addressRepo.updateAddress(userId, addressId, address);
    } catch (e: any) {
      throw e;
    }
  }

  public async deleteAddress(
    userId: string,
    addressId: string
  ): Promise<Boolean> {
    try {
      if (!userId) {
        throw Error("User Id is required");
      }

      return this.addressRepo.deleteAddress(userId, addressId);
    } catch (e: any) {
      throw e;
    }
  }
}

import { inject, injectable } from "inversify";

// Data
import { IAuthDataSource, IUserDataSource } from "data/index.data";

// DI
import { TYPES } from "di/type.di";

// Interface
import { IAuthRepository } from "modules/auth/auth.module";
import { UserDbObject } from "generated/types";

@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @inject(TYPES.IAuthDataSource) private readonly authDs: IAuthDataSource,
    @inject(TYPES.IUserDataSource) private readonly userDs: IUserDataSource
  ) {}

  public async verifyToken(token: string): Promise<string> {
    try {
      const firebaseId = await this.authDs.verifyToken(token);

      const user: UserDbObject | null = await this.userDs.getUserByFirebaseId(
        firebaseId
      );

      // Firebase Id exist, return user id
      if (user) {
        return user._id.toString();
      }

      // Else create new user with empty cart
      const newUser: Partial<UserDbObject> = {
        firebaseId: firebaseId,
        cart: {
          items: [],
          totalAmount: 0,
        },
      };

      const userId = await this.userDs.createUser(newUser);

      return userId;
    } catch (e: any) {
      throw e;
    }
  }
}

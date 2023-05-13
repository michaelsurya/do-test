import { injectable, inject } from "inversify";

import { TYPES } from "di/type.di";

import { IAuthDataSource, IFirebaseConnection } from "data/index.data";

@injectable()
export class AuthDataSource implements IAuthDataSource {
  constructor(
    @inject(TYPES.IFirebaseConnection) private readonly firebaseConnection: IFirebaseConnection
  ) {}

  public async verifyToken(token: string): Promise<string> {
      return await this.firebaseConnection.verifyToken(token)
  }
}

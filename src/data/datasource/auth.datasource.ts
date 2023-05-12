import { injectable, inject } from "inversify";

import { TYPES } from "di/type.di";

import { IAuthDataSource, IFirebaseService } from "data/index.data";

@injectable()
export class AuthDataSource implements IAuthDataSource {
  constructor(
    @inject(TYPES.IFirebaseService) private readonly dbService: IFirebaseService
  ) {}

  public async verifyToken(token: string): Promise<string> {
      return await this.dbService.verifyToken(token)
  }
}

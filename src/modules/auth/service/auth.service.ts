import { inject, injectable } from "inversify";

import { TYPES } from "di/type.di";

import { IAuthRepository, IAuthService } from "modules/auth/auth.module";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.IAuthRepository) private readonly authRepo: IAuthRepository
  ) {}

  public async verifyToken(token: string): Promise<string> {
    return await this.authRepo.verifyToken(token);
  }
}

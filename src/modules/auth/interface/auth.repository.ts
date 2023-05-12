export interface IAuthRepository {
    verifyToken(token: string): Promise<string>;
}

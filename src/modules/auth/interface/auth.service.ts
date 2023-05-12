export interface IAuthService {
    verifyToken(token: string): Promise<string>;
}
export interface IAuthDataSource {
    verifyToken(token: string): Promise<string>
}
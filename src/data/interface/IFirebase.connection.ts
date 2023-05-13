export interface IFirebaseConnection {
    verifyToken(token: string): Promise<string>
}
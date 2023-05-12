export interface IFirebaseService {
    verifyToken(token: string): Promise<string>
}
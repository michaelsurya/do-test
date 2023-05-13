import { UserDbObject } from "generated/types";

export interface IUserDataSource {
  getUserByFirebaseId(firebaseId: string): Promise<UserDbObject | null>;

  getUser(id: string): Promise<UserDbObject | null>;

  createUser(user: Partial<UserDbObject>, session?: any): Promise<string>;

  editUser(userId: string, user: Partial<UserDbObject>, session?: any): Promise<UserDbObject>;
}

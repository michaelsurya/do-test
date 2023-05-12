import { UserDbObject } from "generated/types";

export interface IUserDataSource {
  getUserByFirebaseId(firebaseId: string): Promise<UserDbObject | null>;

  getUser(id: string): Promise<UserDbObject | null>;

  createUser(user: Partial<UserDbObject>): Promise<string>;

  editUser(userId: string, user: Partial<UserDbObject>): Promise<UserDbObject>;
}

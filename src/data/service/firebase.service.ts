import { credential } from "firebase-admin";
import { ServiceAccount, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "../../../service-account.json";

import { IFirebaseService } from "data/index.data";
import { injectable } from "inversify";

@injectable()
export class FirebaseService implements IFirebaseService {
  private static app: any;

  private init() {
    if (FirebaseService.app) {
      return FirebaseService.app;
    }

    try {
      FirebaseService.app = initializeApp({
        credential: credential.cert(serviceAccount as ServiceAccount),
      });
    } catch (e: any) {
      throw e;
    }
  }

  public async verifyToken(token: string): Promise<string> {
    this.init();
    try {
        const decodedToken =  await getAuth(FirebaseService.app).verifyIdToken(token)
        
        return decodedToken.uid
    } catch (e: any) {
        throw e
    }
  }
}

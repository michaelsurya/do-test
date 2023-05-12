import { injectable } from "inversify";
import { MongoClient, ServerApiVersion, Db, Collection, Document } from "mongodb";

import { IDatabaseService } from "../interface/IDatabase.service";


@injectable()
export class MongoDbService implements IDatabaseService {
  private static db: Db;

  public async getDb(): Promise<Db> {
    if (MongoDbService.db) {
      return Promise.resolve(MongoDbService.db);
    }

    try {
      const client: MongoClient = new MongoClient(process.env.DB_URI || "", {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      await client.connect();

      MongoDbService.db = client.db(process.env.DB_NAME || "");
    } catch (error) {
      throw Error("Cannot connect to MongoDB");
    }

    return Promise.resolve(MongoDbService.db);
  }

}

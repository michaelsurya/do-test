import { injectable } from "inversify";
import {
  MongoClient,
  ServerApiVersion,
  Db,
  Collection,
  Document,
  ClientSession,
} from "mongodb";

import { IDatabaseConnection } from "../interface/IDatabase.connection";

@injectable()
export class MongoDbConnection implements IDatabaseConnection {
  private static client: MongoClient;
  private static db: Db;

  private static session: ClientSession | undefined;

  private async getClient(): Promise<MongoClient> {
    if (MongoDbConnection.client) {
      return MongoDbConnection.client;
    }

    MongoDbConnection.client = await new MongoClient(process.env.DB_URI || "", {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    }).connect();

    return MongoDbConnection.client;
  }

  public async getDb(): Promise<Db> {
    if (MongoDbConnection.db) {
      return Promise.resolve(MongoDbConnection.db);
    }

    try {
      const client = await this.getClient();

      MongoDbConnection.db = client.db(process.env.DB_NAME || "");
    } catch (error) {
      throw Error("Cannot connect to MongoDB");
    }

    return Promise.resolve(MongoDbConnection.db);
  }

  public async getSession(): Promise<ClientSession> {
    if (MongoDbConnection.session) {
      return MongoDbConnection.session;
    }

    const client = await this.getClient();

    MongoDbConnection.session = client.startSession();

    return MongoDbConnection.session;
  }

  public async doTransaction(
    fn: () => Promise<void>
  ): Promise<Document | undefined> {
    const session = await this.getSession();

    try {
      return await session.withTransaction(fn);
    } catch (e: any) {
      throw e;
    } finally {
      await session.endSession();
      MongoDbConnection.session = undefined;
    }
  }
}

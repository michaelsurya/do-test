import "reflect-metadata";

import * as dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

// Important for GQLgen typescript-mongodb
import { makeExecutableSchema } from "@graphql-tools/schema";
import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";

import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

import container from "di/container.di";
import { TYPES } from "di/type.di";

import typeDefs from "graphql/index.schema";
import resolvers from "graphql/index.resolvers";
import { IContextProvider } from "graphql/interface/context.provider";

const app = express();

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({
  typeDefs: [DIRECTIVES, typeDefs],
  resolvers,
});

const server = new ApolloServer<any>({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
  const context = container.get<IContextProvider>(TYPES.IContextProvider);

  app.use(
    "/",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        let userId: string | null = null;

        if (req.headers.token) {
          userId = await context.authService.verifyToken(
            req.headers.token.toString()
          );
        }

        return { ...context, userId: userId };
      },
    })
  );
});

new Promise<void>((resolve) => httpServer.listen({ port: 8000 }, resolve)).then(
  () => console.log(`🚀 Server ready at http://localhost:8000/`)
);

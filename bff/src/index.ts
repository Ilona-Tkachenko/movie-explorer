import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { searchResolver } from "./resolvers/searchResolver";

const resolvers = {
  Query: searchResolver,
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const port = Number(process.env.PORT) || 4000;

  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`Server ready at ${url}`);
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});

import express, { Request } from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import db from './config/connection.js';
import { typeDefs, resolvers } from '../src/schemas/index.js';
import { getUser } from './services/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }: { req: Request }): Promise<{ user: any }> => {
        const token = req.headers.authorization?.split(' ')[1];
        const user = getUser(token);
        return { user };
      }
    })
  );

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  db.once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
  });
}

startServer().catch((err) => {
  console.error('Error starting the server:', err);
});

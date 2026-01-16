import { createServer } from 'http';
import { WebSocketServer } from "ws";
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from "@graphql-tools/schema";
//yoga v2 not working already. using v3
import { pies } from "./data.js";
import { createPubSub } from "graphql-yoga";

const pubSub = createPubSub();

// step1 Define the schema // step2 Define Query // step3 Define resolvers
const typeDefs = `
type Pie {
  id: ID!
  name: String!
  price: Float!
  inStock: Boolean!
  averageRating: Float
  category: String
}

type Pies {
 pies: [Pie!]!
 count: Int!
}

type Query {
  pies: [Pie!]!
  getPies(category: String): Pies!
}

type Mutation {
 addPie(input: PieInput!): Pie!
 }

 input PieInput {
  name: String!
  price: Float!
  inStock: Boolean!
  averageRating: Float
  category: String
 }

 type Subscription {
    pieAdded: Pie!
  }
`;

const resolvers = {
  Query: {
    pies: () => pies,
    getPies: (_, { category }) => {
      const filteredPies = category ? pies.filter(pie => pie.category === category)
      : pies;
      /*
      let filteredPies;

      if (category) {
       filteredPies = pies.filter(
        (pie) => pie.category === category
        );
        } else {
          filteredPies = pies;
        }
  */
      return {
        pies: filteredPies,
        count: filteredPies.length
      } 
    }
  },
  Mutation: {
    addPie: (_, {input }) => {
      const newPie = {
        id: `p${pies.length + 1}`,
        ...input,
      };
      pies.push(newPie);
      // Publish the subscription event
      pubSub.publish('PIE_ADDED', { pieAdded: newPie });
      return newPie;
      },
  },
  Subscription: {
    pieAdded: {
      subscribe: () => pubSub.subscribe('PIE_ADDED'),
      resolve: (payload) => payload.pieAdded,
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

//console.log("schema is:", schema);

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
});

const server = createServer(yoga);
server.listen(4000, () => {
  console.log('🚀 GraphQL ready at http://localhost:4000/graphql');
});

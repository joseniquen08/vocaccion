import { Auth } from "./Auth";
import { User } from "./User";

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Auth.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Auth.resolvers.mutations,
  },
};

export default resolvers;

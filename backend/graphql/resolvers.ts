import { Auth } from "./Auth";
import { Ubication } from "./Ubication";
import { User } from "./User";

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Auth.resolvers.queries,
    ...Ubication.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Auth.resolvers.mutations,
    ...Ubication.resolvers.mutations,
  },
};

export default resolvers;

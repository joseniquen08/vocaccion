import { Auth } from "./Auth";
import { Career } from "./Career";
import { Ubication } from "./Ubication";
import { University } from './University/index';
import { User } from "./User";

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Auth.resolvers.queries,
    ...Ubication.resolvers.queries,
    ...University.resolvers.queries,
    ...Career.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Auth.resolvers.mutations,
    ...Ubication.resolvers.mutations,
    ...University.resolvers.mutations,
    ...Career.resolvers.mutations,
  },
};

export default resolvers;

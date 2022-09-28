import { Auth } from "./Auth";
import { Career } from "./Career";
import { Comment } from "./Comment";
import { Shared } from "./shared";
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
    ...Comment.resolvers.queries,
    ...Shared.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
    ...Auth.resolvers.mutations,
    ...Ubication.resolvers.mutations,
    ...University.resolvers.mutations,
    ...Career.resolvers.mutations,
    ...Comment.resolvers.mutations,
    ...Shared.resolvers.mutations,
  },
};

export default resolvers;

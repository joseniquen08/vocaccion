import { gql } from "apollo-server-express";
import { Auth } from "./Auth";
import { Ubication } from "./Ubication";
import { User } from "./User";

const typeDefs = gql`
  ${User.types}
  ${Auth.types}
  ${Ubication.types}

  type Query {
    ${User.queries}
    ${Ubication.queries}
  }

  type Mutation {
    ${Auth.mutations}
    ${Ubication.mutations}
  }
`;

export default typeDefs;

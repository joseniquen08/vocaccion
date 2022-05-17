import { gql } from "apollo-server-express";
import { Auth } from "./Auth";
import { User } from "./User";

const typeDefs = gql`
  ${User.types}
  ${Auth.types}

  type Query {
    ${User.queries}
  }

  type Mutation {
    ${Auth.mutations}
  }
`;

export default typeDefs;

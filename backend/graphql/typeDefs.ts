import { gql } from "apollo-server-express";
import { Auth } from "./Auth";
import { Ubication } from "./Ubication";
import { University } from "./University";
import { User } from "./User";

const typeDefs = gql`
  ${User.types}
  ${Auth.types}
  ${Ubication.types}
  ${University.types}

  type Query {
    ${User.queries}
    ${Ubication.queries}
    ${University.queries}
  }

  type Mutation {
    ${Auth.mutations}
    ${Ubication.mutations}
    ${University.mutations}
  }
`;

export default typeDefs;

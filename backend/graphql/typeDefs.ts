import { gql } from "apollo-server-express";
import { Auth } from "./Auth";
import { Career } from "./Career";
import { Ubication } from "./Ubication";
import { University } from "./University";
import { User } from "./User";

const typeDefs = gql`
  ${User.types}
  ${Auth.types}
  ${Ubication.types}
  ${University.types}
  ${Career.types}

  type Query {
    ${User.queries}
    ${Auth.queries}
    ${Ubication.queries}
    ${University.queries}
    ${Career.queries}
  }

  type Mutation {
    ${User.mutations}
    ${Auth.mutations}
    ${Ubication.mutations}
    ${University.mutations}
    ${Career.mutations}
  }
`;

export default typeDefs;

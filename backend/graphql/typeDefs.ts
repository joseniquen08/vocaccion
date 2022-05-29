import { gql } from "apollo-server-express";
import { Auth } from "./Auth";
import { Career } from "./Career";
import { Comment } from "./Comment";
import { Shared } from "./shared";
import { Ubication } from "./Ubication";
import { University } from "./University";
import { User } from "./User";

const typeDefs = gql`
  type Error {
    message: String
  }

  ${User.types}
  ${Auth.types}
  ${Ubication.types}
  ${University.types}
  ${Career.types}
  ${Comment.types}
  ${Shared.types}

  type Query {
    ${User.queries}
    ${Auth.queries}
    ${Ubication.queries}
    ${University.queries}
    ${Career.queries}
    ${Comment.queries}
    ${Shared.queries}
  }

  type Mutation {
    ${User.mutations}
    ${Auth.mutations}
    ${Ubication.mutations}
    ${University.mutations}
    ${Career.mutations}
    ${Comment.mutations}
    ${Shared.mutations}
  }
`;

export default typeDefs;

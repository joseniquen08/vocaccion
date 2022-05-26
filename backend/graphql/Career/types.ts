export const types = `
  type Career {
    id: ID
    name: String
    type: String
    description: String
    faculty: String
    idUniversity: String
    imageUniversity: String
    duration: Int
    lastUpdate: String
  }

  input CreateCareerInput {
    name: String!
    type: String!
    description: String
    faculty: String!
    idUniversity: String!
    imageUniversity: String!
    duration: Int!
    lastUpdate: String!
  }

  type CreateCareerOutput {
    id: ID!
    name: String!
    type: String!
    description: String
    faculty: String!
    idUniversity: String!
    nameUniversity: String!
    imageUniversity: String!
    duration: Int!
    lastUpdate: String!
  }
`;

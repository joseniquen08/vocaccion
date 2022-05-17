export const types = `
  input LoginInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type LoginOutput {
    token: String
  }

  type CreateUserOutput {
    token: String
  }
`;
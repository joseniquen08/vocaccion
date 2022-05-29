export const types = `
  input LoginInput {
    email: String!
    password: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    role: String
  }

  type LoginOutput {
    token: String
    errors: Error
  }

  type CreateUserOutput {
    token: String
    errors: Error
  }
`;
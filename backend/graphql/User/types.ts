export const types = `
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type CreateUserOutput {
    token: String
  }
`;
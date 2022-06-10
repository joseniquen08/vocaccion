export const types = `
  union UserOutput = ProviderBoolean | ProviderString

  type ProviderBoolean {
    provider: Boolean
  }

  type ProviderString {
    provider: String
  }

  type User {
    id: ID
    name: String
    username: String
    age: Int
    email: String
    password: String
    image: String
    role: String
    provider: String
    emailVerifiedV: Boolean
  }

  input UpdateUserInput {
    email: String
    age: Int
  }

  input UpdateUserWhitoutProviderInput {
    email: String
    username: String
    name: String
    age: Int
  }

  input UpdateImageUserInput {
    email: String
    image: String
  }

  type UserOutput {
    user: User
  }

  type UserWithoutProviderOutput {
    token: String
    user: User
  }
`;
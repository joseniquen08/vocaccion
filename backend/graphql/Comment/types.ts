export const types = `
  type CommentCareer {
    id: ID
    idUser: String
    idCareer: String
    content: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type CommentUniversity {
    id: ID
    idUser: String
    idUniversity: String
    content: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CreateCommentCareerInput {
    idUser: String!
    idCareer: String!
    content: String!
  }

  input CreateCommentUniversityInput {
    idUser: String!
    idUniversity: String!
    content: String!
  }

  type CommentCareerOutput {
    id: ID
    idUser: String
    idCareer: String
    content: String
    createdAt: DateTime
    updatedAt: DateTime
    nameUser: String
    imageUser: String
  }

  type CommentUniversityOutput {
    id: ID
    idUser: String
    idUniversity: String
    content: String
    createdAt: DateTime
    updatedAt: DateTime
    nameUser: String
    imageUser: String
  }

  type Page {
    id: ID
    name: String
    image: String
  }

  type GetAllCommentsOutput {
    id: ID
    content: String
    createdAt: DateTime
    updatedAt: DateTime
    user: User
    page: Page
  }
`;

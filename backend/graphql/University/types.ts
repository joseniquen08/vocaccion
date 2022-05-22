export const types = `
  type University {
    id: ID
    name: String
    idReferencesRegion: [String]
    idReferencesProvince: [String]
    type: String
    license: String
    campuses: Int
    image: String
  }

  input CreateUniversityInput {
    name: String!
    idReferencesRegion: [String]!
    idReferencesProvince: [String]!
    type: String!
    license: String!
    campuses: Int!
    image: String!
  }

  type UniversityOutput {
    name: String
    regions: [Region]
    provinces: [Province]
    type: String
    license: String
    campuses: Int
    image: String
  }
`;

export const types = `
  type Region {
    id: ID
    idReference: String
    name: String
  }

  type Province {
    id: ID
    idReference: String
    name: String
    idReferenceRegion: String
  }

  input GetRegionInput {
    id: String!
  }

  input GetProvincesByRegionIdInput {
    id: String!
  }

  input CreateRegionInput {
    idReference: String!
    name: String!
  }

  input CreateProvinceInput {
    idReference: String!
    name: String!
    idReferenceRegion: String!
  }

  type RegionOutput {
    idReference: String!
    name: String!
  }

  type ProvinceOutput {
    idReference: String!
    name: String!
  }
`;

export const queries = `
  getAllRegions: [Region]
  getRegionById(input: GetRegionInput!): RegionOutput
  getProvincesByRegionId(input: GetProvincesByRegionIdInput!): [ProvinceOutput]
`;

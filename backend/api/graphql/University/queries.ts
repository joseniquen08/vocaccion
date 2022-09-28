export const queries = `
  getAllUniversities: [UniversityOutput]
  getUniversitiesByType(input: GetUniversitiesByTypeInput): [UniversityOutput]
  getUniversityById(id: String): GetUniversityByIdOutput
`;

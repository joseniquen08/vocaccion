export const queries = `
  getAllCareers: [CreateCareerOutput]
  getCareersByType(input: GetCareersByTypeInput): [CreateCareerOutput]
  getCareerById(id: String): GetCareerByIdOutput
`;

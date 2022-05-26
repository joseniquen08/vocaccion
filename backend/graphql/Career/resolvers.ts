import { CareerModel } from '../../src/career/entity/models/careerModel';
import { CreateCareer, ICareer } from '../../src/career/entity/types/careerTypes';
import { UniversityModel } from '../../src/university/entity/models/universityModel';
import { IUniversity } from '../../src/university/entity/types/universityTypes';

const queries = {
  getAllCareers: async () => {
    const careers: ICareer[] = await CareerModel.find({});
    const careerResponse = await Promise.all(careers.map(async (career) => {
      const { _id, name, type, description, faculty, idUniversity, imageUniversity, duration, lastUpdate } = career;
      const university: IUniversity | null = await UniversityModel.findById(idUniversity);
      if (!university) throw new Error('University not found');
      return {
        id: _id,
        name,
        type,
        description,
        faculty,
        idUniversity,
        imageUniversity,
        duration,
        lastUpdate,
        nameUniversity: university.name,
      }
    }));
    return careerResponse;
  }
};
const mutations = {
  createCareer: async (_: any, { input }: CreateCareer) => {
    const { idUniversity } = input;
    const university: IUniversity | null = await UniversityModel.findById(idUniversity);
    if (!university) throw new Error('University not found');
    input.imageUniversity = university.image;
    const career = new CareerModel(input);
    const newCareer: ICareer = await career.save();
    return newCareer;
  }
};

export const resolvers = { queries, mutations };

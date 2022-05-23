import { ProvinceModel, RegionModel } from '../../src/ubication/entity/models/ubicationModels';
import { UniversityModel } from '../../src/university/entity/models/universityModel';
import { CreateUniversity, IUniversity } from '../../src/university/entity/types/universityTypes';

const queries = {
  getAllUniversities: async () => {
    const universities: IUniversity[] = await UniversityModel.find({});
    const universitiesResponse = await Promise.all(universities.map(async (university) => {
      const { _id, name, idReferencesRegion, idReferencesProvince, type, license, campuses, image } = university;
      const regions = await Promise.all(idReferencesRegion.map(async (idReferenceRegion) => {
        return await RegionModel.findOne({ idReference: idReferenceRegion });
      }));
      const provinces = await Promise.all(idReferencesProvince.map(async (idReferenceProvince) => {
        return await ProvinceModel.findOne({ idReference: idReferenceProvince });
      }));
      return {
        _id,
        name,
        regions,
        provinces,
        type,
        license,
        campuses,
        image,
      };
    }));
    return universitiesResponse;
  }
};

const mutations = {
  createUniversity: async (_: any, { input }: CreateUniversity) => {
    const university = new UniversityModel(input);
    const newUniversity: IUniversity = await university.save();
    return newUniversity;
  }
};

export const resolvers = { queries, mutations };

import { ProvinceModel, RegionModel } from '../../src/ubication/entity/models/ubicationModels';
import { CreateProvince, CreateRegion, IProvince, IRegion } from '../../src/ubication/entity/types/ubicationTypes';

const queries = {
  getAllRegions: async () => {
    return await RegionModel.find({});
  },
  getRegionById: async (_: any, { input }: { input: { id: string } }) => {
    return await RegionModel.findById(input.id);
  },
  getProvincesByRegionId: async (_: any, { input }: { input: { id: string } }) => {
    const { id } = input;
    return await ProvinceModel.find({ idReferenceRegion: id });
  }
};

const mutations = {
  createRegion: async (_: any, { input }: CreateRegion) => {
    const region = new RegionModel(input);
    const newRegion: IRegion = await region.save();
    return newRegion;
  },
  createProvince: async (_: any, { input }: CreateProvince) => {
    const province = new ProvinceModel(input);
    const newProvince: IProvince = await province.save();
    return newProvince;
  }
};

export const resolvers = { queries, mutations };

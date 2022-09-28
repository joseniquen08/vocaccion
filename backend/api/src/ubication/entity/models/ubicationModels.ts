import { model } from 'mongoose';
import { ProvinceSchema, RegionSchema } from '../schemas/ubicationSchemas';
import { IProvince, IRegion } from '../types/ubicationTypes';

export const RegionModel = model<IRegion>('Region', RegionSchema);

export const ProvinceModel = model<IProvince>('Province', ProvinceSchema);

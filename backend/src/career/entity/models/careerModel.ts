import { model } from 'mongoose';
import { CareerSchema } from '../schemas/careerSchemas';
import { ICareer } from '../types/careerTypes';

export const CareerModel = model<ICareer>('Career', CareerSchema);

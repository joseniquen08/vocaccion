import { model } from 'mongoose';
import { UniversitySchema } from '../schemas/universitySchema';
import { IUniversity } from '../types/universityTypes';

export const UniversityModel = model<IUniversity>('University', UniversitySchema);

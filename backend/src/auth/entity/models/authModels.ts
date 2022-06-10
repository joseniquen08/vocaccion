import { model } from "mongoose";
import { PinSchema } from '../schemas/authSchemas';
import { IPin } from '../types/authTypes';

export const PinModel = model<IPin>('Pin', PinSchema);

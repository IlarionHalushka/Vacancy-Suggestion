import mongoose from 'mongoose';
import config from '../config/enviroment';

export const connection = mongoose.connect(config.mongo.uri, error => {
  if (error) {
    throw error;
  }
});

export { Vacancy } from './Vacancy';
export { City } from './City';
export { Company } from './Company';

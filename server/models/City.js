import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    externalId: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export const publicFields = ['createdAt', 'updatedAt', 'name', 'externalId'];

export const City = mongoose.model('City', CitySchema, 'cities');

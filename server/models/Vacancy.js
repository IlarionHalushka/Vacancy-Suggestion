import mongoose from 'mongoose';

const VacancySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    externalId: {
      type: Number,
    },
    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    requirements: {
      type: Array,
    },
    dateExternal: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

export const publicFields = [
  'createdAt',
  'updatedAt',
  'name',
  'description',
  'externalId',
  'cityId',
  'companyId',
  'requirements',
  'dateExternal',
];

export const Vacancy = mongoose.model('Vacancy', VacancySchema, 'vacancies');

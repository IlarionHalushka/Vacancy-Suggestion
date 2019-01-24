import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    contactPerson: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
    contactURL: {
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

export const publicFields = [
  'createdAt',
  'updatedAt',
  'name',
  'externalId',
  'contactPerson',
  'contactPhone',
  'contactURL',
];

export const Company = mongoose.model('Company', CompanySchema, 'companies');

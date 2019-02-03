import mongoose from 'mongoose';

const QualificationSchema = new mongoose.Schema(
  {
    section: {
      type: String,
    },
    values: {
      type: Array,
    },
    counter: {
      type: Number,
      default: 0,
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
  'section',
  'values',
  'counter',
  'createdAt',
  'updatedAt',
];

export const Vacancy = mongoose.model('Qualification', QualificationSchema, 'qualifications');

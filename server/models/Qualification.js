import mongoose from 'mongoose';

const QualificationSchema = new mongoose.Schema(
  {
    section: {
      type: String,
    },
    value: {
      type: String,
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

export const Qualification = mongoose.model('Qualification', QualificationSchema, 'qualifications');

import mongoose, { Model } from "mongoose";

const applicantSchema = new mongoose.Schema({
  backgroundData: {
    surname: { type: String, required: true },
    otherNames: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    placeOfResidence: { type: String, required: true },
    digitalAddress: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
  },
  caretakr: {
    mother: {
      name: { type: String, required: true },
      isAlive: { type: Boolean, required: true },
      contact: { type: String, required: true },
      address: { type: String, required: true },
      occupation: { type: String, required: true },
      nationality: { type: String, required: true },
    },
    father: {
      name: { type: String, required: true },
      isAlive: { type: Boolean, required: true },
      contact: { type: String, required: true },
      address: { type: String, required: true },
      occupation: { type: String, required: true },
      nationality: { type: String, required: true },
    },
    guardian: {
      name: { type: String, required: true },
      isAlive: { type: Boolean, required: true },
      contact: { type: String, required: true },
      address: { type: String, required: true },
      occupation: { type: String, required: true },
      nationality: { type: String, required: true },
    },
  },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  academicHistory: {
    indexNumber: { type: Number, required: true },
    school: { type: String, required: true },
    year: { type: Number, required: true },
    course: { type: String, required: true },
    examsType: { type: String, required: true },
    results: [
      {
        subject: { type: String },
        score: { type: Number },
      },
    ],
  },
  academicAspiration: [
    {
      programme: String,
      priority: Number,
    },
  ],
  documents: {
    passportPicture: String,
    birthCertificate: String,
    nationalID: String
}
});

export const ApplicantModel = new Model("Applicant", applicantSchema);

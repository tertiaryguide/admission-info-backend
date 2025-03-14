import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for Applicant
interface IApplicant extends Document {
  passKey: string;
  email: string;
  personalInfo: {
    surname: string;
    otherNames: string;
    dateOfBirth: string;
    nationality: string;
    placeOfResidence: string;
    digitalAddress: string;
    homeAddress: string;
    contact: string;
  };
  guardianInfo: {
    mother: {
      name: string;
      isAlive: boolean;
      contact: string;
      address: string;
      occupation: string;
      nationality: string;
    };
    father: {
      name: string;
      isAlive: boolean;
      contact: string;
      address: string;
      occupation: string;
      nationality: string;
    };
    guardian: {
      name: string;
      isAlive: boolean;
      contact: string;
      address: string;
      occupation: string;
      nationality: string;
    };
  };
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
  academicHistory: {
    indexNumber: string;
    school: string;
    year: string;
    course: string; 
    examsType: string;
    results: [
      {
        subject: { type: String },
        grade: { type: String },
      },
      { _id: false } // Prevent MongoDB from adding _id to each result
    ],
  };
  academicAspiration: string[];
  documents: Map<string, string>; // Fix: Map type with key and value
}

// Define the schema
const applicantSchema: Schema = new Schema({
  passKey: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  personalInfo: {
    surname: { type: String },
    otherNames: { type: String },
    dateOfBirth: { type: String },
    nationality: { type: String },
    placeOfResidence: { type: String },
    digitalAddress: { type: String },
    homeAddress: { type: String },
    contact: { type: String },
  },
  guardianInfo: {
    mother: {
      name: { type: String },
      isAlive: { type: Boolean },
      contact: { type: String },
      address: { type: String },
      occupation: { type: String },
      nationality: { type: String },
    },
    father: {
      name: { type: String },
      isAlive: { type: Boolean },
      contact: { type: String },
      address: { type: String },
      occupation: { type: String },
      nationality: { type: String },
    },
    guardian: {
      name: { type: String },
      isAlive: { type: Boolean },
      contact: { type: String },
      address: { type: String },
      occupation: { type: String },
      nationality: { type: String },
    },
  },
  academicHistory: {
    indexNumber: { type: String },
    school: { type: String },
    year: { type: String },
    course: { type: String },
    examsType: { type: String },
    results: [
      {
        subject: { type: String },
        grade: { type: String },
      },
    ],
  },
  academicAspiration: [{ type: String }],
  documents: {
    type: Map,
    of: String, // Value type is String
    default: {}, // Initialize as an empty Map
  },
});

// Export the model
export const ApplicantModel: Model<IApplicant> = mongoose.model<IApplicant>(
  "Applicant",
  applicantSchema
);

import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for Applicant
interface IApplicant extends Document {
  referenceNumber: string;
  passKey: string;
  backgroundData: {
    surname: string;
    otherNames: string;
    dateOfBirth: String;
    nationality: string;
    placeOfResidence: string;
    digitalAddress: string;
    homeAddress: string;
    email: string;
    contact: string;
  };
  caretakr: {
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
    indexNumber: number;
    school: string;
    year: number;
    course: string;
    examsType: string;
    results: {
      subject: string;
      score: number;
    }[];
  };
  academicAspiration: string[];
  documents: string[];
}

// Define the schema
const applicantSchema: Schema = new Schema({
  referenceNumber: { type: String, unique: true, required: true },
  passKey: { type: String, required: true },
  backgroundData: {
    surname: { type: String },
    otherNames: { type: String },
    dateOfBirth: { type: String },
    nationality: { type: String },
    placeOfResidence: { type: String },
    digitalAddress: { type: String },
    homeAddress: { type: String },
    email: { type: String },
    contact: { type: String },
  },
  caretakr: {
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
    indexNumber: { type: Number },
    school: { type: String },
    year: { type: Number },
    course: { type: String },
    examsType: { type: String },
    results: [
      {
        subject: { type: String },
        score: { type: Number },
      },
    ],
  },
  academicAspiration: [{ type: String }],
  documents: [{type: String}],
});

// Export the model
export const ApplicantModel: Model<IApplicant> = mongoose.model<IApplicant>(
  "Applicant",
  applicantSchema
);

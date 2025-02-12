import mongoose, { Schema, Document, Model } from "mongoose";

interface IAdmin extends Document {
    email: string;
    password: string;
    name: string;
}

const adminSchema: Schema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
})

// Export the model
export const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>(
  "Admin",
  adminSchema
);

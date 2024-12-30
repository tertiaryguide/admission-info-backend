import mongoose, { Model } from "mongoose";

const applicantSchema = new mongoose.Schema({
    backgroundData: {
        surname: {type: String, required: true},
        otherNames: {type: String, required: true},
        dateOfBirth: {type: Date, required: true},
        nationality: {type: String, required: true},
        placeOfResidence: {type: String, required: true},
        digitalAddress: {type: String, required: true},
        email: {type: String, required: true},
        contact: {type: String, required: true},
    },
    guardian: {

    },
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false}
    },
    academic: {
        
    }
})

const Applicant = new Model(applicantSchema, "Applicant")
export default Applicant
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createProfile = exports.uploadFile = exports.uploadFiles = exports.deleteData = exports.retrieveData = exports.deleteAcademicAspiration = exports.deleteAcademicHistory = exports.deleteCaretakerData = exports.deletepersonalInfo = exports.editAcademicAspiration = exports.editAcademicHistory = exports.editGuardianInfo = exports.editPersonalInfo = exports.createAcademicAspiration = exports.createAcademics = exports.createCaretakerData = exports.createPersonalInfo = void 0;
const applicant_model_1 = require("./applicant.model");
const jwt = __importStar(require("jsonwebtoken"));
const getErrorMessage_1 = require("../utils/getErrorMessage");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SECRET = "27Hi0oIY2Fgh!9";
console.log(SECRET);
// Create Background Data
const createPersonalInfo = async (req, res, next) => {
    try {
        const { applicantId, personalInfo } = req.body;
        console.log(personalInfo, applicantId);
        if (!applicantId || !personalInfo) {
            res
                .status(400)
                .json({ message: "Applicant ID and background data are required" });
            return;
        }
        const applicant = await applicant_model_1.ApplicantModel.findByIdAndUpdate(applicantId, { personalInfo }, { new: true } // Return the updated document
        );
        if (!applicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Background data added successfully", data: applicant });
    }
    catch (error) {
        next(error); // Pass errors to the global error handler
    }
};
exports.createPersonalInfo = createPersonalInfo;
// Create Caretaker Data
const createCaretakerData = async (req, res, next) => {
    try {
        const { applicantId, caretakerData } = req.body;
        if (!applicantId || !caretakerData) {
            res
                .status(400)
                .json({ message: "Applicant ID and caretaker data are required" });
            return;
        }
        const applicant = await applicant_model_1.ApplicantModel.findById(applicantId);
        if (!applicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        applicant.guardianInfo = caretakerData;
        await applicant.save();
        res
            .status(200)
            .json({ message: "Caretaker data added successfully", data: applicant });
    }
    catch (error) {
        next(error); // Pass errors to the global error handler
    }
};
exports.createCaretakerData = createCaretakerData;
// Create Academic History
const createAcademics = async (req, res, next) => {
    try {
        const { applicantId, academicHistory, academicAspiration } = req.body;
        if (!applicantId || !academicHistory || !academicAspiration) {
            res.status(400).json({ message: "Applicant ID, academic history, and academic aspiration are required" });
            return;
        }
        const applicant = await applicant_model_1.ApplicantModel.findById(applicantId);
        if (!applicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        // Ensure academicHistory has a results property and it's an array
        if (!Array.isArray(academicHistory.results)) {
            res.status(400).json({ message: "Academic history results must be an array" });
            return;
        }
        // Ensure results contain subject and grade before saving
        const formattedResults = academicHistory.results.map((result) => {
            if (!result.subject || !result.grade) {
                throw new Error("Each result must have a subject and grade");
            }
            return {
                subject: result.subject,
                grade: result.grade,
            };
        });
        applicant.academicHistory = {
            ...academicHistory,
            results: formattedResults,
        };
        applicant.academicAspiration = academicAspiration;
        await applicant.save();
        res.status(200).json({
            message: "Academic history and aspiration added successfully",
            data: {
                course: applicant.academicHistory.course,
                examsType: applicant.academicHistory.examsType,
                results: applicant.academicHistory.results,
                academicAspiration: applicant.academicAspiration,
            },
        });
    }
    catch (error) {
        console.error("Error in createAcademics:", error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            next(error);
        }
    }
};
exports.createAcademics = createAcademics;
// Create Academic Aspiration
const createAcademicAspiration = async (req, res, next) => {
    try {
        const { applicantId, academicAspiration } = req.body;
        if (!applicantId || !academicAspiration) {
            res
                .status(400)
                .json({ message: "Applicant ID and academic aspiration are required" });
            return;
        }
        const applicant = await applicant_model_1.ApplicantModel.findById(applicantId);
        if (!applicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        applicant.academicAspiration = academicAspiration;
        await applicant.save();
        res.status(200).json({
            message: "Academic aspiration added successfully",
            data: applicant,
        });
    }
    catch (error) {
        next(error); // Pass errors to the global error handler
    }
};
exports.createAcademicAspiration = createAcademicAspiration;
// Edit Background Data
const editPersonalInfo = async (req, res, next) => {
    try {
        const { applicantId } = req.params;
        const { personalInfo } = req.body;
        if (!applicantId || !personalInfo) {
            res
                .status(400)
                .json({ message: "Applicant ID and background data are required" });
            return;
        }
        const updatedApplicant = await applicant_model_1.ApplicantModel.findByIdAndUpdate(applicantId, { personalInfo }, { new: true } // Return the updated document
        );
        if (!updatedApplicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        res.status(200).json({
            message: "Background data updated successfully",
            data: updatedApplicant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editPersonalInfo = editPersonalInfo;
// Edit Caretaker Data
const editGuardianInfo = async (req, res, next) => {
    try {
        const { applicantId } = req.params;
        const { caretakerData } = req.body;
        if (!applicantId || !caretakerData) {
            res
                .status(400)
                .json({ message: "Applicant ID and caretaker data are required" });
            return;
        }
        const updatedApplicant = await applicant_model_1.ApplicantModel.findByIdAndUpdate(applicantId, { guardianInfo: caretakerData }, { new: true });
        if (!updatedApplicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        res.status(200).json({
            message: "Caretaker data updated successfully",
            data: updatedApplicant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editGuardianInfo = editGuardianInfo;
// Edit Academic History 
const editAcademicHistory = async (req, res, next) => {
    try {
        const { applicantId } = req.params;
        const { academicHistory } = req.body;
        if (!applicantId || !academicHistory) {
            res
                .status(400)
                .json({ message: "Applicant ID and academic history are required" });
            return;
        }
        const updatedApplicant = await applicant_model_1.ApplicantModel.findByIdAndUpdate(applicantId, { academicHistory }, { new: true });
        if (!updatedApplicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        res.status(200).json({
            message: "Academic history updated successfully",
            data: updatedApplicant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editAcademicHistory = editAcademicHistory;
// Edit Academic Aspiration
const editAcademicAspiration = async (req, res, next) => {
    try {
        const { applicantId } = req.params;
        const { academicAspiration } = req.body;
        if (!applicantId || !academicAspiration) {
            res
                .status(400)
                .json({ message: "Applicant ID and academic aspiration are required" });
            return;
        }
        const updatedApplicant = await applicant_model_1.ApplicantModel.findByIdAndUpdate(applicantId, { academicAspiration }, { new: true });
        if (!updatedApplicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        res.status(200).json({
            message: "Academic aspiration updated successfully",
            data: updatedApplicant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editAcademicAspiration = editAcademicAspiration;
// Delete Background Data
const deletepersonalInfo = async (req, res, next) => {
    try {
        const { applicantId } = req.body;
        if (!applicantId) {
            res.status(400).json({ message: "Applicant ID is required" });
            return;
        }
        const updatedApplicant = await applicant_model_1.ApplicantModel.findByIdAndUpdate(applicantId, { $unset: { personalInfo: "" } }, // Remove the personalInfo field
        { new: true });
        if (!updatedApplicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        res.status(200).json({
            message: "Background data deleted successfully",
            data: updatedApplicant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deletepersonalInfo = deletepersonalInfo;
// Delete Caretaker Data
const deleteCaretakerData = async (req, res, next) => {
    try {
        const { applicantId } = req.body;
        if (!applicantId) {
            res.status(400).json({ message: "Applicant ID is required" });
            return;
        }
        const updatedApplicant = await applicant_model_1.ApplicantModel.findByIdAndUpdate(applicantId, { $unset: { guardianInfo: "" } }, { new: true });
        if (!updatedApplicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        res.status(200).json({
            message: "Caretaker data deleted successfully",
            data: updatedApplicant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCaretakerData = deleteCaretakerData;
// Delete Academic History
const deleteAcademicHistory = async (req, res, next) => {
    try {
        const { applicantId } = req.body;
        if (!applicantId) {
            res.status(400).json({ message: "Applicant ID is required" });
            return;
        }
        const updatedApplicant = await applicant_model_1.ApplicantModel.findByIdAndUpdate(applicantId, { $unset: { academicHistory: "" } }, { new: true });
        if (!updatedApplicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        res.status(200).json({
            message: "Academic history deleted successfully",
            data: updatedApplicant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAcademicHistory = deleteAcademicHistory;
// Delete Academic Aspiration
const deleteAcademicAspiration = async (req, res, next) => {
    try {
        const { applicantId } = req.params;
        if (!applicantId) {
            res.status(400).json({ message: "Applicant ID is required" });
            return;
        }
        const updatedApplicant = await applicant_model_1.ApplicantModel.findByIdAndUpdate(applicantId, { $unset: { academicAspiration: "" } }, { new: true });
        if (!updatedApplicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        res.status(200).json({
            message: "Academic aspiration deleted successfully",
            data: updatedApplicant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteAcademicAspiration = deleteAcademicAspiration;
const retrieveData = async (req, res, next) => {
    try {
        const { applicantId } = req.params;
        console.log(`Retrieving`, applicantId);
        if (!applicantId) {
            res.status(400).json({ message: "Applicant ID is required" });
            return;
        }
        console.log(`Retrieving applying information`);
        const applicant = await applicant_model_1.ApplicantModel.findById(applicantId);
        if (!applicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        console.log(applicant);
        res.status(200).json({
            message: "Applicant data retrieved successfully",
            applicant: applicant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.retrieveData = retrieveData;
const deleteData = async (req, res, next) => {
    try {
        const { applicantId } = req.params;
        if (!applicantId) {
            res.status(400).json({ message: "Applicant ID is required" });
            return;
        }
        const deletedApplicant = await applicant_model_1.ApplicantModel.findByIdAndDelete(applicantId);
        if (!deletedApplicant) {
            res.status(404).json({ message: "Applicant not found" });
            return;
        }
        res.status(200).json({
            message: "Applicant deleted successfully",
            data: deletedApplicant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteData = deleteData;
const uploadFiles = async (req, res, next) => {
    const { applicantId } = req.params;
    const { fileUrls } = req.body;
    try {
        const applicant = await applicant_model_1.ApplicantModel.findById(applicantId);
        if (!applicant) {
            res.status(404).json({ error: "Applicant not found." });
            return;
        }
        applicant.documents = fileUrls;
        console.log("received");
        res.status(200).json({ message: "Files uploaded successfully!" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to save file URLs." });
    }
};
exports.uploadFiles = uploadFiles;
const uploadFile = async (req, res, next) => {
    const { applicantId } = req.params;
    const { fileUrl, selectedField } = req.body;
    try {
        const applicant = await applicant_model_1.ApplicantModel.findById(applicantId);
        if (!applicant) {
            res.status(404).json({ error: "Applicant not found." });
            return;
        }
        // Ensure documents is initialized as a Map
        if (!applicant.documents) {
            applicant.documents = new Map();
        }
        // Use Map's set method to store the document as a key-value pair
        applicant.documents.set(selectedField, fileUrl);
        await applicant.save();
        console.log("Document uploaded");
        res.status(200).json({ message: "File uploaded successfully!" });
    }
    catch (error) {
        console.error("Error saving file:", error);
        res.status(500).json({ error: "Failed to save file URL." });
    }
};
exports.uploadFile = uploadFile;
const createProfile = async (req, res, next) => {
    try {
        const { email, passKey } = req.body;
        console.log(email, passKey);
        if (!email || !passKey) {
            res.status(400).json({ message: "Email and passkey are required" });
            return;
        }
        const existingApplicant = await applicant_model_1.ApplicantModel.findOne({ email });
        console.log(existingApplicant);
        if (existingApplicant) {
            res.status(409).json({ message: "Email already exists" });
            return;
        }
        console.log("creating applicant");
        const hashedPassKey = bcrypt_1.default.hashSync(passKey, 10);
        const newApplicant = new applicant_model_1.ApplicantModel({ email, passKey: hashedPassKey });
        await newApplicant.save();
        console.log("done creating applicant");
        console.log(SECRET);
        const token = jwt.sign({ id: newApplicant._id?.toString() }, SECRET, {
            expiresIn: "30 days",
        });
        res.status(201).json({
            message: "Applicant profile created successfully",
            id: newApplicant._id,
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProfile = createProfile;
const login = async (req, res, next) => {
    try {
        const { email, passKey } = req.body;
        console.log(1);
        if (!email || !passKey) {
            res.status(400).json({ message: "data are required" });
            return;
        }
        const applicant = await applicant_model_1.ApplicantModel.findOne({ email });
        console.log(applicant);
        if (!applicant) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        console.log(3);
        const passKeysMatch = bcrypt_1.default.compareSync(passKey, applicant.passKey);
        console.log(4);
        if (passKeysMatch) {
            const token = jwt.sign({ id: applicant._id?.toString() }, SECRET, {
                expiresIn: "30 days",
            });
            console.log(5);
            res
                .status(200)
                .json({ message: "Applicant logged in successfully", token: token, id: applicant._id });
        }
        else {
            throw new Error("passKeys do not match");
        }
    }
    catch (error) {
        res.status(500).send((0, getErrorMessage_1.getErrorMessage)(error));
    }
};
exports.login = login;
//# sourceMappingURL=applicant.controller.js.map
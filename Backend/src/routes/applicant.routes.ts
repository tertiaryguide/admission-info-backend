import { Router } from "express";
import { 
  createBackgroundData, 
  createCaretakerData, 
  createAcademicHistory, 
  createAcademicAspiration, 
  retrieveData,
  deleteData,
  createProfile,
  uploadFiles,
  login,
  uploadFile
} from "../controller/applicant.controller"; // Adjust the path as needed
import { auth } from "../middleware";

const router = Router();

// route for account creation and login
router.post("/create-applicant", createProfile)
router.post("/login", login)

// Route for creating background data
router.post("/background-data",auth, createBackgroundData);

// Route for creating caretaker data
router.post("/caretaker-data",auth, createCaretakerData);

// Route for creating academic history
router.post("/academic-history",auth, createAcademicHistory);

// Route for creating academic aspiration
router.post("/academic-aspiration",auth, createAcademicAspiration);

router.get("/:applicantId/fetch-data",auth, retrieveData)

router.delete("/:applicantId/delete-data",auth, deleteData)

router.post("/:applicantId/upload-file",auth, uploadFile);


export default router;

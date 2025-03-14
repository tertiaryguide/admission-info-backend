import { Router } from "express";
import { 
  createPersonalInfo, 
  createCaretakerData, 
  createAcademics, 
  createAcademicAspiration, 
  retrieveData,
  deleteData,
  createProfile,
  uploadFiles,
  login,
  uploadFile,
  editAcademicHistory,
  editAcademicAspiration,
  editPersonalInfo
} from "./applicant.controller"; // Adjust the path as needed
import { auth } from "../middleware";

const router = Router();

// route for account creation and login
router.post("/create-applicant", createProfile)
router.post("/login", login)

// Route for creating background data
router.post("/background-data",auth, createPersonalInfo);
router.put("/:applicantId/update-personal-info", editPersonalInfo)

// Route for creating caretaker data
router.post("/caretaker-data",auth, createCaretakerData); 

// Route for creating academic history
router.post("/academics",auth, createAcademics);

// Route for updating academic history
router.put("/:applicantId/update-academic-history",auth, editAcademicHistory);

// Route for updating academic aspiration
router.put("/:applicantId/update-academic-aspiration",auth, editAcademicAspiration);

router.get("/:applicantId/fetch-data",auth, retrieveData)

router.delete("/:applicantId/delete-data",auth, deleteData)

router.post("/:applicantId/upload-file",auth, uploadFile);


export default router;

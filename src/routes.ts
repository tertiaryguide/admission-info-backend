import { Router } from "express";
import { 
  createBackgroundData, 
  createCaretakerData, 
  createAcademicHistory, 
  createAcademicAspiration 
} from "./controller/applicant.controller"; // Adjust the path as needed

const router = Router();

// Route for creating background data
router.post("/background-data", createBackgroundData);

// Route for creating caretaker data
router.post("/caretaker-data", createCaretakerData);

// Route for creating academic history
router.post("/academic-history", createAcademicHistory);

// Route for creating academic aspiration
router.post("/academic-aspiration", createAcademicAspiration);

export default router;

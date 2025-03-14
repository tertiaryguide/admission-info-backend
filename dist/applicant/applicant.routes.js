"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicant_controller_1 = require("./applicant.controller"); // Adjust the path as needed
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
// route for account creation and login
router.post("/create-applicant", applicant_controller_1.createProfile);
router.post("/login", applicant_controller_1.login);
// Route for creating background data
router.post("/background-data", middleware_1.auth, applicant_controller_1.createPersonalInfo);
router.put("/:applicantId/update-personal-info", applicant_controller_1.editPersonalInfo);
// Route for creating caretaker data
router.post("/caretaker-data", middleware_1.auth, applicant_controller_1.createCaretakerData);
// Route for creating academic history
router.post("/academics", middleware_1.auth, applicant_controller_1.createAcademics);
// Route for updating academic history
router.put("/:applicantId/update-academic-history", middleware_1.auth, applicant_controller_1.editAcademicHistory);
// Route for updating academic aspiration
router.put("/:applicantId/update-academic-aspiration", middleware_1.auth, applicant_controller_1.editAcademicAspiration);
router.get("/:applicantId/fetch-data", middleware_1.auth, applicant_controller_1.retrieveData);
router.delete("/:applicantId/delete-data", middleware_1.auth, applicant_controller_1.deleteData);
router.post("/:applicantId/upload-file", middleware_1.auth, applicant_controller_1.uploadFile);
exports.default = router;
//# sourceMappingURL=applicant.routes.js.map
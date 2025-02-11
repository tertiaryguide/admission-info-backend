import { NextFunction, Request, Response } from "express";
import { ApplicantModel } from "../models/Applicant";
import * as jwt from "jsonwebtoken";
import { getErrorMessage } from "../utils/getErrorMessage";
import bcrypt from "bcrypt";

const SECRET = "27Hi0oIY2Fgh!9";
console.log(SECRET);
// Create Background Data
export const createBackgroundData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId, backgroundData } = req.body;

    if (!applicantId || !backgroundData) {
      res
        .status(400)
        .json({ message: "Applicant ID and background data are required" });
      return;
    }

    const applicant = await ApplicantModel.findByIdAndUpdate(
      applicantId,
      { backgroundData },
      { new: true } // Return the updated document
    );

    if (!applicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Background data added successfully", data: applicant });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

// Create Caretaker Data
export const createCaretakerData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId, caretakerData } = req.body;

    if (!applicantId || !caretakerData) {
      res
        .status(400)
        .json({ message: "Applicant ID and caretaker data are required" });
      return;
    }

    const applicant = await ApplicantModel.findById(applicantId);
    if (!applicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    applicant.caretakr = caretakerData;
    await applicant.save();

    res
      .status(200)
      .json({ message: "Caretaker data added successfully", data: applicant });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

// Create Academic History
export const createAcademicHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId, academicHistory } = req.body;

    if (!applicantId || !academicHistory) {
      res
        .status(400)
        .json({ message: "Applicant ID and academic history are required" });
      return;
    }

    const applicant = await ApplicantModel.findById(applicantId);
    if (!applicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    applicant.academicHistory = academicHistory;
    await applicant.save();

    res.status(200).json({
      message: "Academic history added successfully",
      data: applicant,
    });
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

// Create Academic Aspiration
export const createAcademicAspiration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId, academicAspiration } = req.body;

    if (!applicantId || !academicAspiration) {
      res
        .status(400)
        .json({ message: "Applicant ID and academic aspiration are required" });
      return;
    }

    const applicant = await ApplicantModel.findById(applicantId);
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
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

// Edit Background Data
export const editBackgroundData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId, backgroundData } = req.body;

    if (!applicantId || !backgroundData) {
      res
        .status(400)
        .json({ message: "Applicant ID and background data are required" });
      return;
    }

    const updatedApplicant = await ApplicantModel.findByIdAndUpdate(
      applicantId,
      { backgroundData },
      { new: true } // Return the updated document
    );

    if (!updatedApplicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res.status(200).json({
      message: "Background data updated successfully",
      data: updatedApplicant,
    });
  } catch (error) {
    next(error);
  }
};

// Edit Caretaker Data
export const editCaretakerData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId, caretakerData } = req.body;

    if (!applicantId || !caretakerData) {
      res
        .status(400)
        .json({ message: "Applicant ID and caretaker data are required" });
      return;
    }

    const updatedApplicant = await ApplicantModel.findByIdAndUpdate(
      applicantId,
      { caretakr: caretakerData },
      { new: true }
    );

    if (!updatedApplicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res.status(200).json({
      message: "Caretaker data updated successfully",
      data: updatedApplicant,
    });
  } catch (error) {
    next(error);
  }
};

// Edit Academic History
export const editAcademicHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId, academicHistory } = req.body;

    if (!applicantId || !academicHistory) {
      res
        .status(400)
        .json({ message: "Applicant ID and academic history are required" });
      return;
    }

    const updatedApplicant = await ApplicantModel.findByIdAndUpdate(
      applicantId,
      { academicHistory },
      { new: true }
    );

    if (!updatedApplicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res.status(200).json({
      message: "Academic history updated successfully",
      data: updatedApplicant,
    });
  } catch (error) {
    next(error);
  }
};

// Edit Academic Aspiration
export const editAcademicAspiration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId, academicAspiration } = req.body;

    if (!applicantId || !academicAspiration) {
      res
        .status(400)
        .json({ message: "Applicant ID and academic aspiration are required" });
      return;
    }

    const updatedApplicant = await ApplicantModel.findByIdAndUpdate(
      applicantId,
      { academicAspiration },
      { new: true }
    );

    if (!updatedApplicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res.status(200).json({
      message: "Academic aspiration updated successfully",
      data: updatedApplicant,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Background Data
export const deleteBackgroundData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId } = req.body;

    if (!applicantId) {
      res.status(400).json({ message: "Applicant ID is required" });
      return;
    }

    const updatedApplicant = await ApplicantModel.findByIdAndUpdate(
      applicantId,
      { $unset: { backgroundData: "" } }, // Remove the backgroundData field
      { new: true }
    );

    if (!updatedApplicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res.status(200).json({
      message: "Background data deleted successfully",
      data: updatedApplicant,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Caretaker Data
export const deleteCaretakerData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId } = req.body;

    if (!applicantId) {
      res.status(400).json({ message: "Applicant ID is required" });
      return;
    }

    const updatedApplicant = await ApplicantModel.findByIdAndUpdate(
      applicantId,
      { $unset: { caretakr: "" } },
      { new: true }
    );

    if (!updatedApplicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res.status(200).json({
      message: "Caretaker data deleted successfully",
      data: updatedApplicant,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Academic History
export const deleteAcademicHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId } = req.body;

    if (!applicantId) {
      res.status(400).json({ message: "Applicant ID is required" });
      return;
    }

    const updatedApplicant = await ApplicantModel.findByIdAndUpdate(
      applicantId,
      { $unset: { academicHistory: "" } },
      { new: true }
    );

    if (!updatedApplicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res.status(200).json({
      message: "Academic history deleted successfully",
      data: updatedApplicant,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Academic Aspiration
export const deleteAcademicAspiration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId } = req.params;

    if (!applicantId) {
      res.status(400).json({ message: "Applicant ID is required" });
      return;
    }

    const updatedApplicant = await ApplicantModel.findByIdAndUpdate(
      applicantId,
      { $unset: { academicAspiration: "" } },
      { new: true }
    );

    if (!updatedApplicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res.status(200).json({
      message: "Academic aspiration deleted successfully",
      data: updatedApplicant,
    });
  } catch (error) {
    next(error);
  }
};

export const retrieveData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId } = req.params;

    if (!applicantId) {
      res.status(400).json({ message: "Applicant ID is required" });
      return;
    }

    const applicant = await ApplicantModel.findById(applicantId);

    if (!applicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res.status(200).json({
      message: "Applicant data retrieved successfully",
      data: applicant,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { applicantId } = req.params;

    if (!applicantId) {
      res.status(400).json({ message: "Applicant ID is required" });
      return;
    }

    const deletedApplicant = await ApplicantModel.findByIdAndDelete(
      applicantId
    );

    if (!deletedApplicant) {
      res.status(404).json({ message: "Applicant not found" });
      return;
    }

    res.status(200).json({
      message: "Applicant deleted successfully",
      data: deletedApplicant,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { applicantId } = req.params;
  const { fileUrls } = req.body;
  try {
    const applicant = await ApplicantModel.findById(applicantId);
    if (!applicant) {
      res.status(404).json({ error: "Applicant not found." });
      return;
    }
    applicant.documents = fileUrls;
    console.log("received");
    res.status(200).json({ message: "Files uploaded successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save file URLs." });
  }
};

export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, passKey } = req.body;
    console.log(email, passKey);
    if (!email || !passKey) {
      res.status(400).json({ message: "Email and passkey are required" });
      return;
    }

    const existingApplicant = await ApplicantModel.findOne({ email });
    console.log(existingApplicant);
    if (existingApplicant) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }
    console.log("creating applicant");
    const hashedPassKey = bcrypt.hashSync(passKey, 10);
    const newApplicant = new ApplicantModel({ email, passKey:hashedPassKey });
    await newApplicant.save();
    console.log("done creating applicant");
    console.log(SECRET)
    const token = jwt.sign({ id: newApplicant._id?.toString() }, SECRET, {
      expiresIn: "30 days",
    });
    res.status(201).json({
      message: "Applicant profile created successfully",
      data: newApplicant._id,
      token,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, passKey } = req.body;
    console.log(1)
    if (!email || !passKey) {
      res.status(400).json({ message: "data are required" });
      return;
    }
    const applicant = await ApplicantModel.findOne({email});
    console.log(applicant)
    if (!applicant) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    console.log(3)

    const passKeysMatch = bcrypt.compareSync(
      passKey,
      applicant.passKey
    );
    console.log(4)

    if (passKeysMatch) {
      const token = jwt.sign({ id: applicant._id?.toString() }, SECRET, {
        expiresIn: "30 days",
      });
    console.log(4)
      res
        .status(200)
        .json({ message: "Applicant logged in successfully", token: token });
    } else {
      throw new Error("passKeys do not match");
    }
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};

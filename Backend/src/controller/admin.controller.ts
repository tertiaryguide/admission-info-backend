import { NextFunction, Request, Response } from "express";
import { AdminModel } from "models/Admin";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "index";
import * as jwt from "jsonwebtoken";
import { getErrorMessage } from "utils/getErrorMessage";

// Create admin
export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { data } = req.body;

    if (!data) {
      res.status(400).json({ message: "data are required" });
      return;
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const admin = await AdminModel.create({
      ...data,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ message: "Admin created successfully", data: admin });
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { data } = req.body;

    if (!data) {
      res.status(400).json({ message: "data are required" });
      return;
    }
    const admin = await AdminModel.findOne({ email: data.email });
    if (!admin) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const passwordsMatch = await bcrypt.compareSync(
      data.password,
      admin.password
    );

    if (passwordsMatch) {
      const token = jwt.sign({ id: admin._id?.toString() }, JWT_SECRET, {
        expiresIn: "30 days",
      });
      res
        .status(200)
        .json({ message: "Admin logged in successfully", data: admin });
    } else {
      throw new Error("Passwords do not match");
    }
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};

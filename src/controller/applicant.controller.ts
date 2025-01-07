import express from "express";
import { ApplicantModel } from "models/Applicant";

export const newData = async (req: express.Request, res: express.Response) => {
  try {
    const {fname, lname, oname, dob, gender, nationality, religion, email, contact} = req.body
    const newD = await ApplicantModel.create(req.body)
    return {message: "Data saved"}
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
};


export const editData = async (req: express.Request, res: express.Response) => {
    try {
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  };

  
  export const deleteData = async (req: express.Request, res: express.Response) => {
    try {
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
  };
  
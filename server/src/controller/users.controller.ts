import type{ Request, Response } from "express";

const userRegistrationController = (req: Request, res: Response) => {
  // Handle user registration logic
  const { username, password } = req.body;

  // Perform registration logic (e.g., save user to database)
  // ...


};



export { 
    userRegistrationController
};
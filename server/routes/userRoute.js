import express from "express";
import { Login, Register, updatePassword, updateProfile } from "../controllers/userController.js";
import isAuthenticatedUser from "../middleware/auth.js";


const route = express.Router();

route.post('/register', Register);
route.post('/login', Login);
route.put('/updateProfile', isAuthenticatedUser, updateProfile);
route.put('/updatePassword', isAuthenticatedUser, updatePassword);

export default route;

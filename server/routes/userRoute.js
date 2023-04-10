import express from "express";
import { Login, Register, updatePassword, updateProfile } from "../controllers/userController.js";
import isAuthenticatedUser from "../middleware/auth.js";


const route = express.Router();

route.post('/register', Register);
route.get('/login', Login);
route.post('/updateProfile', isAuthenticatedUser, updateProfile);
route.post('/updatePassword', isAuthenticatedUser, updatePassword);

export default route;

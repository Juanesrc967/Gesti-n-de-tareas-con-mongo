import { Router } from "express";
import { login , register, logout, verifyToken, Profile } from "../Controllers/auth.controller.js";
import {authRequired} from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema,loginSchema } from "../schemas/auth.schema.js";


const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.get("/verify", verifyToken);

router.post("/logout", verifyToken, logout);

router.post('/Profile', authRequired,  Profile);

export default router
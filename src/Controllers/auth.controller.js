import User from "../models/user.model.js";
import bccrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {

        const UserFound = await User.findOne({ email });
        if (UserFound)
            return res.status(400).json(["the email is already in use"]);

        const passwordHash = await bccrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAT: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const UserFound = await User.findOne({ email })

        if (!UserFound) return res.status(400).json({ message: "Usuario no encontrado" });

        const isMatch = await bccrypt.compare(password, UserFound.password);

        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = await createAccessToken({ id: UserFound._id });

        res.cookie('token', token);
        res.json({
            id: UserFound._id,
            username: UserFound.username,
            email: UserFound.email,
            createdAt: UserFound.createdAt,
            updatedAT: UserFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};


export const Profile = async (req, res) => {
    const UserFound = await User.findById(req.user.id)

    if (!UserFound) return res.status(400).json({ message: "user not found" });

    return res.json({
        id: UserFound._id,
        username: UserFound.username,
        email: UserFound.email,
        createdAt: UserFound.createdAt,
        updatedAT: UserFound.updatedAT,
    })
    res.send("profile")
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};


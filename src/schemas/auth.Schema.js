import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Username is requiered',
    }),
    email: z.string({
        required_error: 'Email is requiered',
    }).email({
        message: 'Invalid email',
    }),
    password: z.string({ required_error: "Password is required", }).min(6, {
        message: "password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is requiered',
    }).email({
        message: 'Invalid email',
    }),
    password: z.string({ required_error: "Password is required", }).min(6, {
        message: "password must be at least 6 characters",
    }),
});
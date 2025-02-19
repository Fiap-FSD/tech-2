import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(6),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

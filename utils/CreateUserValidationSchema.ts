import { z } from 'zod';

export const CreateUserValidationSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(3),
  role_id: z.number(),
});

import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email'),
	phone: z
		.string()
		.min(10, 'Phone contain 10 numbers')
		.regex(/^\d+$/, 'Phone must contain only numbers')
});

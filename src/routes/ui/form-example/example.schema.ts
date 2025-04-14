import * as v from 'valibot';

export const exampleSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1, 'Name is required')),
	email: v.pipe(v.string(), v.email('Invalid email')),
	phone: v.pipe(
		v.string(),
		v.minLength(1, 'Phone is required'),
		v.regex(/^\d+$/, 'Phone must contain only numbers')
	)
});

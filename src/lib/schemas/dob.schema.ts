import * as v from 'valibot';

export const schema = v.object({
	dob: v.pipe(v.string())
});

// See https://svelte.dev/docs/kit/types#app.d.ts

import type pino from 'pino';

// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code: number;
			message: string;
		}
		interface Locals {
			logger: pino.Logger;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

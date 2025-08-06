import { browser } from '$app/environment';
import type { AuthStore, User } from '$lib/types/user.type';
import { writable, type Writable } from 'svelte/store';

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthStore>({
		user: null,
		accessToken: undefined
	});
	return {
		subscribe,
		set,
		update,
		init: (initialState: AuthStore) => {
			if (browser) {
				set(initialState);
			}
		},
		login: (user: User, accessToken: string) => {
			if (browser) {
				set({ user, accessToken });
			}
		},
		logout: () => {
			if (browser) {
				set({ user: null, accessToken: undefined });
			}
		},
		setAccessToken: (accessToken: string) => {
			if (browser) {
				update((store) => ({ ...store, accessToken }));
			}
		}
	};
}

export const authStore: Writable<AuthStore> = createAuthStore();

import { sveltekit } from '@sveltejs/kit/vite';
import mkcert from 'vite-plugin-mkcert'

/** @type {import('vite').UserConfig} */
const config = {
	server: { https: true },
	plugins: [sveltekit(), mkcert()]
};

export default config;

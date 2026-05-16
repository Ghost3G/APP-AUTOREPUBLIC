import 'reflect-metadata';

async function start() {
	try {
		// Try to start Adonis if available
		// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
		const { Ignitor } = require('@adonisjs/core/build/standalone');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		new Ignitor(__dirname).httpServer().start();
	} catch (err) {
		// Fallback to lightweight mock server for local dev
		// eslint-disable-next-line no-console
		console.warn('Adonis failed to start — falling back to mock server:', String(err));
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		require('./mock_server');
	}
}

start();

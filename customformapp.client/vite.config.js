import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = 'customformapp.client';
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

// Only run HTTPS setup if not in production mode (e.g., when not running inside Docker)
const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment && (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath))) {
    if (
        0 !==
        child_process.spawnSync(
            'dotnet',
            [
                'dev-certs',
                'https',
                '--export-path',
                certFilePath,
                '--format',
                'Pem',
                '--no-password',
            ],
            { stdio: 'inherit' }
        ).status
    ) {
        throw new Error('Could not create certificate.');
    }
}

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
        ? env.ASPNETCORE_URLS.split(';')[0]
        : 'https://localhost:7128';

export default defineConfig({
    base: './',
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: target,
                changeOrigin: true,
                secure: false, // Disable SSL verification for proxy during development
            },
        },
        port: 5173,
        https: /*isDevelopment
            ? {
                key: fs.existsSync(keyFilePath) ? fs.readFileSync(keyFilePath) : undefined,
                cert: fs.existsSync(certFilePath) ? fs.readFileSync(certFilePath) : undefined,
            }
            :*/ false, // Disable HTTPS for production
    },
});

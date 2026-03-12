import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['mariadb', '@prisma/adapter-mariadb', '@prisma/client'],
  images: {
    unoptimized: true,
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [320, 420, 768, 1024, 1200],
  },
  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    additionalData: `@use "${path.join(__dirname, 'src/app/variables')}" as *; @use "${path.join(__dirname, 'src/styles/mixins')}" as *;`,
  },
};

export default nextConfig;

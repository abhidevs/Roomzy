import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient();

// NextJs v13 hot reloading may cause a bunch of prisma client to spawn
// To avoid this in development server, we will use the existing client
// present in globalThis, which persists through hot reloadings
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = client;
}

export default client;

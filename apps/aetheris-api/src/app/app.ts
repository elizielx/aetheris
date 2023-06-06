import * as path from "path";
import { FastifyInstance } from "fastify";
import AutoLoad from "@fastify/autoload";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter, createContext } from "@aetheris/trpc";

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
    fastify.register(fastifyTRPCPlugin, {
        prefix: "/trpc",
        trpcOptions: { router: appRouter, createContext },
    });

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, "plugins"),
        options: { ...opts },
    });
}

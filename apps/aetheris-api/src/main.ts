import Fastify from "fastify";
import pino from "pino";
import { app } from "./app/app";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const logger = pino({
    transport: {
        target: "pino-pretty",
    },
});

const server = Fastify({
    maxParamLength: 5000,
    logger,
});

server.register(app);

server.listen({ port, host }, (err) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
});

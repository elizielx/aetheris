import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(async function (fastify: FastifyInstance) {
    fastify.register(cors, {
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    });
});

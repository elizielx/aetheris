import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { client } from "@aetheris/trpc";

export default async function (fastify: FastifyInstance) {
    fastify.get("/", async function (request: FastifyRequest, reply: FastifyReply) {
        const users = await client.getUsers.query(2);
        console.log(await client.admin.secret.query());
        return { message: "Hello API" };
    });
    fastify.get("/admin", async function (request: FastifyRequest, reply: FastifyReply) {
        const secret = await client.admin.secret.query();
        console.log(secret);
        return { secret };
    });
}

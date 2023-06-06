import { initTRPC } from "@trpc/server";
import superjson from "superjson";

type User = {
    id: string;
    name: string;
    username: string;
};

export interface MiddlewareContext {
    user?: Pick<User, "username">;
}

export const t = initTRPC.context<MiddlewareContext>().create({
    transformer: superjson,
    allowOutsideOfServer: true,
});

export const router = t.router;
export const procedure = t.procedure;

import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

type User = {
    id: string;
    name: string;
    bio?: string;
};

export interface MiddlewareContext {
    user?: {
        name: string;
    };
}

const users: Record<string, User> = {
    "1": { id: "1", name: "Alice" },
    "2": { id: "2", name: "Bob" },
    "3": { id: "3", name: "Charlie" },
};

export const t = initTRPC.context<MiddlewareContext>().create({
    transformer: superjson,
});

const isAuthed = t.middleware((opts) => {
    const { ctx } = opts;
    if (ctx.user?.name != "test") {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }
    return opts.next({
        ctx: {
            user: ctx.user,
        },
    });
});

export const proctedProcedures = t.procedure.use(isAuthed);
export const appRouter = t.router({
    admin: t.router({
        secret: proctedProcedures.query((opts) => {
            return {
                secret: "test",
            };
        }),
    }),
    getUsers: t.procedure.input(z.number().optional()).query((opts) => {
        return Object.values(users).slice(0, opts.input);
    }),
    getUserById: t.procedure.input(z.string()).query((opts) => {
        return users[opts.input];
    }),
    createUser: t.procedure
        .input(
            z.object({
                name: z.string().min(3),
                bio: z.string().max(142).optional(),
            })
        )
        .mutation((opts) => {
            const id = Date.now().toString();
            const user: User = { id, name: opts.input.name!, bio: opts.input.bio };
            users[user.id] = user;
            return user;
        }),
});

export type AppRouter = typeof appRouter;

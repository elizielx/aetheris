import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

type User = {
    id: string;
    name: string;
    bio?: string;
};

const users: Record<string, User> = {
    "1": { id: "1", name: "Alice" },
    "2": { id: "2", name: "Bob" },
    "3": { id: "3", name: "Charlie" },
};

export const t = initTRPC.create({
    transformer: superjson,
});

export const appRouter = t.router({
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

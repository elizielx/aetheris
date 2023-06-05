import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./router";
import superjson from "superjson";

export const client = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
        httpBatchLink({
            url: "http://localhost:3000/trpc",
        }),
    ],
});

"use client";

import { AppRouter } from "@aetheris/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFetch, httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import superjson from "superjson";

export const client = createTRPCReact<AppRouter>({});

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = (p) => {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:4200/api/trpc/";

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 5000,
                    },
                },
            })
    );
    const [trpcClient] = useState(() =>
        client.createClient({
            transformer: superjson,
            links: [
                loggerLink({
                    enabled: () => true,
                }),
                httpBatchLink({
                    url,
                    fetch: async (input, init?) => {
                        const fetch = getFetch();
                        return fetch(input, {
                            ...init,
                            credentials: "include",
                        });
                    },
                    async headers() {
                        return {
                            authorization: "test",
                        };
                    },
                }),
            ],
        })
    );
    return (
        <client.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
        </client.Provider>
    );
};

import { FetchCreateContextFnOptions, fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@aetheris/trpc";

const handler = (request: Request) => {
    console.log(`incoming request ${request.url}`);
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: function (opts: FetchCreateContextFnOptions): object | Promise<object> {
            return {
                user: {
                    name: "test next",
                },
            };
        },
    });
};

export { handler as GET, handler as POST };

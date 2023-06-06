import { router, procedure } from "../server";

export const healthRouter = router({
    health: procedure.query(() => {
        return { status: "ok" };
    }),
});

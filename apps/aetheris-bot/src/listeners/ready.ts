import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";
import { client as trpcClient } from "../trpc-client";

export class ReadyListener extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
        super(context, {
            ...options,
            once: true,
            event: "ready",
        });
    }

    public async run(client: Client) {
        const { username, id } = client.user;
        this.container.logger.info(`Successfully logged in as ${username} (${id})`);
        this.container.logger.info(`Aetheris API is ${(await trpcClient.health.health.query()).status}`);
    }
}

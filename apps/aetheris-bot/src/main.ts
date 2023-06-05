import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";

const client = new SapphireClient({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    baseUserDirectory: __dirname,
    loadMessageCommandListeners: true,
});
client.login(process.env.NODE_ENV === "production" ? process.env.DISCORD_TOKEN : process.env.CANARY_DISCORD_TOKEN);

import { ImperiaClient } from "@aetheris/lib";
import { GatewayIntentBits } from "discord.js";

const client = new ImperiaClient({
    overrideApplicationCommandsRegistries: true,
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    baseUserDirectory: __dirname,
    loadMessageCommandListeners: true,
});
client.login(process.env.NODE_ENV === "production" ? process.env.DISCORD_TOKEN : process.env.CANARY_DISCORD_TOKEN);

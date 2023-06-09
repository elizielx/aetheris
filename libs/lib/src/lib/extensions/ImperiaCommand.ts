import { Subcommand, SubcommandOptions } from "@sapphire/plugin-subcommands";
import { ChatInputCommand } from "@sapphire/framework";

export abstract class ImperiaCommand extends Subcommand {
    protected constructor(context: Subcommand.Context, options: SubcommandOptions) {
        super(context, {
            ...options,
        });
    }

    // @ts-ignore: Promise<unknown> instead of Promise<void>
    public async chatInputRun(
        interaction: ChatInputCommand.Interaction,
        context: ChatInputCommand.RunContext
    ): Promise<unknown> {
        return super.chatInputRun(interaction, context);
    }
}

export declare namespace ImperiaCommand {
    type Options = SubcommandOptions;
    type JSON = Subcommand.JSON;
    type Context = Subcommand.Context;
    type RunInTypes = Subcommand.RunInTypes;
    type ChatInputCommandInteraction = Subcommand.ChatInputCommandInteraction;
    type ContextMenuCommandInteraction = Subcommand.ContextMenuCommandInteraction;
    type AutocompleteInteraction = Subcommand.AutocompleteInteraction;
    type Registry = Subcommand.Registry;
}

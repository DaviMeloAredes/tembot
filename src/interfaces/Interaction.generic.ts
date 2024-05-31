import { CommandInteraction } from "discord.js";

type InteractionChoice = {
    name: string,
    value: string
};

type InteractionOption = {
    name: string,
    description: string,
    type: number,
    required: boolean,
    choices?: InteractionChoice[]
};

export interface InteractionGeneric {
    name: string;
    type: number,
    description: string;
    response(interaction: CommandInteraction): Promise<void>;
    options?: InteractionOption[]
}
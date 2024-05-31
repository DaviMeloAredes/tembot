import { CommandInteraction } from "discord.js";

export type InteractionChoice = {
    name: string,
    value: string
};

export type InteractionOption = {
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
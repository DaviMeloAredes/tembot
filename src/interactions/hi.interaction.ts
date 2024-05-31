import { CommandInteraction, CacheType } from "discord.js";
import { InteractionGeneric } from "../interfaces/Interaction.generic";

class Hi implements InteractionGeneric {
    name: string;
    type: number;
    description: string;

    constructor () {
        this.name = 'hi';
        this.type = 1;
        this.description = 'say hi. just, yk?'
    }

    async response(interaction: CommandInteraction<CacheType>): Promise<void> {
        interaction.reply('hi.');
    }
}

export default new Hi();
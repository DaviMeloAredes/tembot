import { CommandInteraction } from "discord.js";
import { EventInterface } from "../interfaces/Event.generic";
import { InteractionController } from "../controllers/Interaction.controller";

const interactionController = new InteractionController();

class InteractionCreate implements EventInterface {
    name: string; 
    
    constructor () {
        this.name = 'interactionCreate';
    }

    async run(args: CommandInteraction): Promise<void> {
        const interaction = await interactionController.getInteractionByName(args.commandName);

        await interaction.response(args);
    }
}

export default new InteractionCreate();
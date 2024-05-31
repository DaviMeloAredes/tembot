import loggerAdapter from "../adapters/Logger.adapter";
import { Client } from "discord.js";
import { EventInterface } from "../interfaces/Event.generic";

class Ready implements EventInterface {
    name: string; 
    
    constructor () {
        this.name = 'ready';
    }

    async run(args: Client): Promise<void> {
        loggerAdapter.log(`Logged on ${args.user?.username}`, 'info');
    }
}

export default new Ready();
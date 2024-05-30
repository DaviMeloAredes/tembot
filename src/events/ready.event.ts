import { Client } from "discord.js";
import loggerAdapter from "../adapters/LoggerAdapter";
import { EventGeneric, EventInterface } from "../interfaces/EventGeneric";

class Ready extends EventGeneric {
    name: string; 
    
    constructor () {
        super();

        this.name = 'ready';
    }

    async run(args: Client): Promise<void> {
        loggerAdapter.log(`Logged on ${args.user?.username}`, 'info');
    }
}

export default new Ready();
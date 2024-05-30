import { Client, IntentsBitField } from 'discord.js';

const { Flags } = IntentsBitField;

const client = new Client({
    intents: [
        Flags.GuildPresences,
        Flags.MessageContent
    ]
});

export default client;
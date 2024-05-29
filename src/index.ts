import { Client, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const { Flags } = IntentsBitField;
const { CLIENT_TOKEN } = process.env;

const client = new Client({
    intents: [
        Flags.GuildPresences,
        Flags.MessageContent
    ]
});

client.login(CLIENT_TOKEN);
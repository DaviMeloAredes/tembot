import client from "./client";
import dotenv from 'dotenv';
import { EventController } from "./controllers/Event.controller";
import { InteractionController } from "./controllers/Interaction.controller";

dotenv.config();

const { CLIENT_TOKEN } = process.env;

const eventController = new EventController();
const interactionController = new InteractionController();

eventController.startEvents();
interactionController.loadInteractions();

client.login(CLIENT_TOKEN);
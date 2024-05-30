import client from "./client";
import dotenv from 'dotenv';
import { EventController } from "./controllers/EventController";

dotenv.config();

const { CLIENT_TOKEN } = process.env;
const eventController = new EventController();

eventController.startEvents();

client.login(CLIENT_TOKEN);
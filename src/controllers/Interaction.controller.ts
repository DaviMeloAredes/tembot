import dotenv from 'dotenv';
import fg from 'fast-glob';
import loggerAdapter from '../adapters/Logger.adapter';

import { RequestControllerAdapter } from "../adapters/Request.controller.adapter";
import { InteractionGeneric } from "../interfaces/Interaction.generic";

dotenv.config();

const requestControllerAdapter = new RequestControllerAdapter();

export class InteractionController {
    public interactions: Map<string, InteractionGeneric>;
    
    constructor () {
        this.interactions = new Map();
    }

    getInteractions () {
        return this.interactions;
    }

    async addInteraction (data: InteractionGeneric) {
        const url = `${requestControllerAdapter._dc_url}/commands`;
        const alreadyExists = await this.pushInteractionsFromDiscordAPI(data.name);

        if (alreadyExists) {
            return loggerAdapter.log(`already exists in api: ${data.name}`, 'load-process');
        }

        const headers = {
            'Authorization': `Bot ${process.env.CLIENT_TOKEN}`
        }

        await requestControllerAdapter.makeRequest(url, 'post', {
            data,
            headers
        })
        .then(() => {
            loggerAdapter.log(`interaction: ${data.name} loaded`, 'load-process');
        })
        .catch((e) => {
            loggerAdapter.log(e, 'error');
        });
    }

    async pushInteractionsFromDiscordAPI (interactionName?: string) {
        return new Promise(async (resolve, reject) => {
            const url = `${requestControllerAdapter._dc_url}/commands`;

            const headers = {
                'Authorization': `Bot ${process.env.CLIENT_TOKEN}`
            }
    
            await requestControllerAdapter.makeRequest(url, 'get', {
                headers
            })
            .then((data: InteractionGeneric[]) => {
                if (interactionName) {
                    const filter = data.filter((i) => i.name === interactionName);

                    resolve(filter[0]);
                }

                resolve(data);
            })
            .catch((e) => {
                loggerAdapter.log(e, 'error');
            });
        })
    }

    async readInteractionsFolder (): Promise<InteractionGeneric[]> {
        let interactionsArr: InteractionGeneric[] = [];
    
        const interactionsFiles = await fg('src/interactions/**/**.interaction.ts');

        for (let i = 0; i < interactionsFiles.length; i++) {
            const interaction = interactionsFiles[i];
            const props = (await import(`../../${interaction}`)).default;

            interactionsArr.push(props);
        }

        return interactionsArr;
    }

    async loadInteractions () {
        const interactions = await this.readInteractionsFolder();

        interactions.forEach(async (i) => {
            await this.addInteraction(i)
                .catch((e) => {
                    loggerAdapter.log(e, 'error');
                });
        });
    }
    
    async getInteractionByName (name: string) {
        const interactions = await this.readInteractionsFolder();
        const filter = interactions.filter((i) => i.name === name);

        return filter[0];
    }
}
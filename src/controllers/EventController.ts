import fg from 'fast-glob';
import client from '../client';
import { EventGeneric } from '../interfaces/EventGeneric';

export class EventController {
    getFilesPropsFromEventsFolder (): Promise<EventGeneric[]> {
        return new Promise(async (resolve, reject) => {
            const files = await fg('src/events/**/**.event.ts');
            
            let propsArr: EventGeneric[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const props: EventGeneric = (await import(`../../${file}`)).default;

                propsArr.push(props);
            }

            resolve(propsArr);
        });
    }

    async startEvents () {
        const propsArr = await this.getFilesPropsFromEventsFolder();
        
        propsArr.forEach((props) => {
            client.on(props.name, (args) => props.run(args));
        });
    }
}
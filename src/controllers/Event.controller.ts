import fg from 'fast-glob';
import client from '../client';
import { EventInterface } from '../interfaces/Event.generic';

export class EventController {
    getFilesPropsFromEventsFolder (): Promise<EventInterface[]> {
        return new Promise(async (resolve, reject) => {
            const files = await fg('src/events/**/**.event.ts');
            
            let propsArr: EventInterface[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const props: EventInterface = (await import(`../../${file}`)).default;

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
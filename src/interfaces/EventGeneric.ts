export interface EventInterface {
    name: string;
    run(args: any): Promise<void>;
}

export class EventGeneric implements EventInterface {
    name: string;
    
    constructor () {
        this.name = '';
    }

    async run(args: any): Promise<void> {}
};
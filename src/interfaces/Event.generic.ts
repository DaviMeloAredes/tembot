export interface EventInterface {
    name: string;
    run(args: any): Promise<void>;
}
export class CommandBase {
    name = '';
    
    execute(): Promise<boolean> {
        return new Promise(resolve => resolve(true));
    }
}
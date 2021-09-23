export class BaseCommand {
    name = ''

    execute(): Promise<boolean> {
        return new Promise(resolve => resolve(true))
    }
}
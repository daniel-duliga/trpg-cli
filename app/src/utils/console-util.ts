import prettyjson from 'prettyjson';

export class ConsoleUtil {
    static logStringResult(message: string, ...args: any[]): void {
        console.log('! Result:', message, ...args)
    }

    static logObjectResult(data: any, ...args: any[]): void {
        console.log('! Result:')
        console.log(prettyjson.render(data))
    }
    
    static logProgress(message: string, ...args: any[]): void {
        console.log('~', message, ...args)
    }
}
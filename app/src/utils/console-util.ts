export class ConsoleUtil {
    static logResult(message: string, ...args: any[]): void {
        console.log('! Result:', message, ...args)
    }
    
    static logProgress(message: string, ...args: any[]): void {
        console.log('~', message, ...args)
    }
}
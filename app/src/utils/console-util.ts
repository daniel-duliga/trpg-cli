export function logResult(message: string, ...args: any[]): void {
    console.log('! Result:', message, ...args)
}

export function logProgress(message: string, ...args: any[]): void {
    console.log('~', message, ...args)
}
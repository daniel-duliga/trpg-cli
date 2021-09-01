export function logResult(message: string, ...args: any[]) {
    console.log('! Result:', message, ...args)
}

export function logProgress(message: string, ...args: any[]) {
    console.log('~', message, ...args)
}
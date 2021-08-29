export function logResult(message, ...args) {
    console.log('! Result:', message, ...args)
}

export function logProgress(message, ...args) {
    console.log('~', message, ...args)
}
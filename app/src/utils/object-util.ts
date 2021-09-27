export class ObjectUtil {
    static getObjectAttributes(object: any): string[] {
        let result: string[] = []
        const keys = Object.keys(object)
        for (const key of keys) {
            const value = object[key]
            if (typeof(value) === 'object') {
                const innerAttributes = ObjectUtil.getObjectAttributes(value).map(x => `${key}/${x}`)
                result = result.concat(innerAttributes)
            } else {
                result.push(key)
            }
        }
        return result
    }
}
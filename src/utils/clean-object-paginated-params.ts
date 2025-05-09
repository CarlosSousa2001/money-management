// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cleanObject(obj: Record<string, any>) {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    );
}

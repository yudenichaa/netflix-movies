export function truncate(text: string, newLength: number): string {
    if (text.length < 0)
        throw Error("impossible to truncate string. new length < 0");
    else if (text.length == 0 || text.length <= newLength) return text;
    else return text.slice(0, newLength - 1) + "…";
}

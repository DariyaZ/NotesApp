export function useTruncateString(str: string, length: number = 20): string {
    if (str.length > length) {
       const truncatedString = str.slice(0, length - 3) + "...";
       return truncatedString;
    }
    return str;
 }
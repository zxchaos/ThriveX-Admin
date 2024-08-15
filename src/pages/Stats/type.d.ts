export interface Result {
    timeSpan: string[];
    fields: string[];
    items: [
        string[][],
        number[][],
        any[],
        any[]
    ];
}
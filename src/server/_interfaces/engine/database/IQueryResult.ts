export interface IQueryResult<T> {
    command: string;
    rowCount: number;
    oid: number;
    rows: T[];
}
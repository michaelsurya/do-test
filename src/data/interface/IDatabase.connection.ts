export interface IDatabaseConnection {
    getDb(): any

    getSession(): any

    doTransaction(fn: () => Promise<any>): any
}
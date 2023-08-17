export interface IJwtPayload {
  uid: string,
  aplicacion: string,
  empresa: string
}
export interface IUpdateService {
    acknowledged: boolean,
    modifiedCount: number,
    upsertedId: string,
    upsertedCount: number,
    matchedCount: number
}
export const PORT: string | number = process.env.PORT || 3000;
// export const HOSTNAME: string = '127.0.0.1';
export enum Actions {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

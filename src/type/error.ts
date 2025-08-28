export interface CustomError extends Error {
  code?: string;
  detail?: string;
  table?: string;
}

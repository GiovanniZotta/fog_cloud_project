export type RequiredSome<T, TRequired extends keyof T> = T & Required<Pick<T, TRequired>>;

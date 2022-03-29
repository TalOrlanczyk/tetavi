import { ApiError } from "./error";

export const asyncHandler =
  (fn) =>
  (...args) => {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };
export const isRequired = (paramName: string, statusCode: number = 400) => {
  throw new ApiError(statusCode, `${paramName} is required`);
};

import { isValidObjectId } from "mongoose";
import z from "zod";

export const zObjectId = z.coerce
  .string()
  .refine((val) => isValidObjectId(val), {
    message: "Invalid ObjectId",
  });

export function makeAllOptionalStrings<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
) {
  const newShape: z.ZodRawShape = {};

  for (const key in schema.shape) {
    newShape[key] = z.string().optional();
  }

  return z.object(newShape);
}
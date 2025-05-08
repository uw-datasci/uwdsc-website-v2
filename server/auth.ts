import jwt from "jsonwebtoken";
import { env } from "@/env/server";
import z from "zod";
import { roleOptions } from "@/constants/roles";

const tokenSecret = env.ACCESS_TOKEN_SECRET;

export const ClientTokenTypeSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  id: z.string(),
  userStatus: z.enum(roleOptions),
});

export type ClientToken = z.infer<typeof ClientTokenTypeSchema>;

export function signJWT(clientToken: ClientToken): string {
  return jwt.sign(
    {
      clientToken,
    },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: "120d" },
  );
}

export function decodeJWT(token: string): ClientToken | null {
  try {
    const decoded = jwt.verify(token, tokenSecret) as jwt.JwtPayload;
    const result = ClientTokenTypeSchema.safeParse(decoded.user);
    if (!result.success) {
      console.warn("Error decoding JWT");
      return null;
    }
    return result.data;
  } catch (err) {
    console.warn("Error parsing JWT:", err);
    return null;
  }
}

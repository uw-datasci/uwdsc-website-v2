// server/context.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "./db/mongoose";
import { decodeJWT } from "./auth";

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  
  const mongoose = await connectToDB();
  const auth = req.headers.authorization;
  const token = auth?.split(" ")[1];
  let user = null;

  if ( auth?.startsWith("Bearer") && token ) {
    try {
      user = decodeJWT(token);
    } catch (err) {
      console.warn("Invalid JWT: ", err);
    }
  }
  return { mongoose, req, res, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

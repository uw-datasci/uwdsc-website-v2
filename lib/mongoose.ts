import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

declare global {
  var mongooseConn:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

// Use a cached connection across hot reloads and serverless container reuses
let cached = global.mongooseConn ?? { conn: null, promise: null };
global.mongooseConn = cached;

/**
 * Connects to MongoDB using Mongoose.
 * Caches the connection promise and instance to avoid reconnecting on every invocation.
 */
export async function connectToDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      // other mongoose options can go here
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(
      "MongoDB connected:",
      cached.conn.connection.host,
      cached.conn.connection.name,
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return cached.conn;
}

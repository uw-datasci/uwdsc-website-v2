import type { NextApiRequest, NextApiResponse } from "next";
import { appRouter } from "../../server/routers/_app";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV !== "development") {
    return res.status(404).send("Not Found");
  }

  const { renderTrpcPanel } = await import("trpc-ui");
  res.status(200).send(
    renderTrpcPanel(appRouter, {
      url: "/api/trpc",
      transformer: "superjson",
    }),
  );
}

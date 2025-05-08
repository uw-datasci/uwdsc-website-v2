import { router } from "@/server/trpc";
import { subEventProcedures } from "./procedures";

export const subEventRouter = router({
  ...subEventProcedures,
});

import { router } from "@/server/trpc";
import { registrantProcedures } from "./procedures";


export const registrantRouter = router({
  ...registrantProcedures,
});

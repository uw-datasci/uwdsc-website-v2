import { router } from "@/server/trpc";
import { memberProcedures } from "./procedures";

export const memberRouter = router({
  ...memberProcedures,
});
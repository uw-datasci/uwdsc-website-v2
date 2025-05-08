import { router } from "@/server/trpc";
import { authProcedures } from "./procedures";

export const authRouter = router({
  ...authProcedures,
});

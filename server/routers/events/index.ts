import { router } from "@/server/trpc";
import { eventProcedures } from "./procedures";
import { registrantRouter } from "./registrants/index";
import { subEventRouter } from "./subEvents/index";

export const eventRouter = router({
  ...eventProcedures,
  registrants: registrantRouter,
  subevents: subEventRouter,
});

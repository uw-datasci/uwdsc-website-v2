import { TRPCError } from "@trpc/server";

export function verifyRequirements(
  member: Record<string, unknown>,
  registrant: Record<string, unknown>,
  requirement: {
    member?: Record<string, unknown>;
    selected?: boolean;
    registrant?: Record<string, unknown>;
  },
) {
  const memberRequirements: any = requirement.member;
  if (memberRequirements) {
    Object.keys(memberRequirements).forEach((memberReq) => {
      if (
        !(memberReq in member) ||
        member[memberReq] !== memberRequirements[memberReq]
      ) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `${memberReq} is required to be ${memberRequirements[memberReq]}, but is ${member[memberReq]} instead`,
        });
      }
    });
  }

  if (requirement.selected && requirement.selected !== registrant.selected) {
    throw new TRPCError({
      code: "CONFLICT",
      message: `Member is not selected`,
    });
  }

  const registrantRequirements: any = requirement.registrant;
  if (registrantRequirements) {
    Object.keys(registrantRequirements).forEach((registrantReq) => {
      if (
        !(registrantReq in registrant) ||
        registrant[registrantReq] !== registrantRequirements[registrantReq]
      ) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `${registrantReq} is required to be ${registrantRequirements[registrantReq]}, but is ${registrant[registrantReq]} instead`,
        });
      }
    });
  }
}

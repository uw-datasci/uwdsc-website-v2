/**
 * Authentication procedures for the UWDSC TRPC API.
 * Each procedure is documented with JSDoc and `publicProcedure.meta`
 */
import { publicProcedure } from "../../trpc";
import { z } from "zod";
import { signJWT } from "@/server/auth";
import { memberModel } from "@/server/db/models/memberModel";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { SignInFormTypeSchema, SignUpFormTypeSchema } from "@/constants/forms";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { transporter } from "@/server/email/transporter";
import { env as clientEnv } from "@/env/client";
import { env as serverEnv } from "@/env/server";
import path from "path";

export const authProcedures = {
  /**
   * Login
   * @summary Authenticate a member and issue a JWT
   * @description Validates the member’s email + password, ensures the email is verified, and returns an access token along with basic profile info.
   */
  login: publicProcedure
    .meta({
      description:
        "Authenticate a verified member and return a JWT access token with member's JWT, name, and role.",
    })
    .input(SignInFormTypeSchema.strict())
    .output(
      z.object({
        accessToken: z.string().min(1),
        name: z.string().min(1),
        role: z.string().min(1),
      }),
    )
    .query(async (opts) => {
      const { email, password } = opts.input;

      const user = await memberModel.findOne({ email: email }).lean();

      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.error(
          `Failed to find member with email: ${email} or password was invalid`,
        );
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password.",
        });
      }

      if (!user.isEmailVerified)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email has not been verified",
        });

      return {
        accessToken: signJWT({
          username: user.username,
          email: user.email,
          id: user._id,
          role: user.role,
        }),
        name: user.username,
        role: user.role,
      };
    }),

  /**
   * Register member
   * @summary Create a new member account
   * @description Creates a member record, hashes the password, and stores onboarding metadata. Throws if the email already exists.
   */
  registerMember: publicProcedure
    .meta({
      description:
        "Create a new member record and return the registered email.",
    })
    .input(SignUpFormTypeSchema)
    .output(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async (opts) => {
      const {
        username,
        email,
        password,
        watIAM,
        faculty,
        term,
        heardFromWhere,
        memberIdeas,
      } = opts.input;
      const existingUser = await memberModel.findOne({ email: email }).lean();

      if (existingUser && !existingUser.isEmailVerified) {
        console.error(
          `${existingUser.username}(${existingUser._id}) is already registered but not verified`,
        );
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: `${email} is already registered, but not verified`,
        });
      }

      if (existingUser) {
        console.error(
          `${existingUser.username}(${existingUser._id}) is already registered`,
        );
        throw new TRPCError({
          code: "CONFLICT",
          message: `${email} is already registered`,
        });
      }

      try {
        await memberModel.create({
          username: username,
          email: email,
          password: await bcrypt.hash(password, 10),
          watIAM: watIAM,
          faculty: faculty,
          term: term,
          heardFromWhere: heardFromWhere,
          memberIdeas: memberIdeas,
          isEmailVerified: true, // To remove when verification works
        });

        return { email: email };
      } catch (err) {
        console.error(`Failed to create user: ${opts.input} \n`, err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }
    }),

  /**
   * Send verification email
   * @summary Trigger account‑verification email
   * @description Generates a time‑limited verification token and emails a verification link to the member.
   */
  sendVerificationEmail: publicProcedure
    .meta({
      description: "Generate a verification token and email it to the member.",
    })
    .input(
      z.object({
        email: z.string().email().describe("[Member] Unique email"),
      }),
    )
    .output(z.void())
    .mutation(async (opts) => {
      const email = opts.input.email;

      const user = await memberModel.findOne({ email: email });

      if (!user) {
        console.error(`Member with ${email} was not found`);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send verification email",
        });
      }

      if (user.isEmailVerified) {
        console.error(
          `${user.username}(${user.id}) with ${email} is already verified`,
        );
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email is already verified",
        });
      }

      const token = uuidv4();
      user.isEmailVerified = true;
      user.token = {
        hash: token,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        purpose: "Verification",
      };
      user.save();

      try {
        const emailHtml = fs
          .readFileSync(
            path.join(process.cwd(), "server/email/forgotpassword.html"),
            "utf8",
          )
          .replace(
            "<custom-link>",
            `${clientEnv.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/account/verification?id=${user.id}&token=${token}`,
          )
          .replace("<custom-email>", email);

        await transporter.sendMail({
          from: {
            name: "DSC Automated Mail",
            address: serverEnv.EMAIL_USER,
          },
          to: email,
          subject: "DSC Account Verification",
          html: emailHtml,
          attachments: [
            {
              filename: "dsc.svg",
              path: path.join(process.cwd(), "server/email/dsc.svg"),
              cid: "logo", //same cid value as in the html img src
            },
          ],
        });

        console.log(`Verification email sent to ${user.username}(${user.id})`);
      } catch (err) {
        console.error(
          `Error generation verification email for ${user.username}(${user.id}) \n`,
          err,
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send verification email",
        });
      }
      return;
    }),

  /**
   * Verify email
   * @summary Mark member email as verified
   * @description Validates the provided verification token and marks the member's email as verified.
   */
  verifyEmail: publicProcedure
    .meta({
      description:
        "Validate a verification token and mark the member email as verified.",
    })
    .input(
      z.object({
        id: z.string().min(1).describe("[Member] Unique ID"),
        token: z.string().min(1).describe("[Member] Token hash"),
      }),
    )
    .output(z.void())
    .mutation(async (opts) => {
      const { id, token } = opts.input;

      const user = await memberModel.findById(id);

      if (!user) {
        console.error(`Member with id: ${id} was not found`);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to verify user",
        });
      }

      if (user.isEmailVerified) {
        console.error(`${user.username}(${user.id}) is already verified`);
        throw new TRPCError({
          code: "CONFLICT",
          message: "User is already verified",
        });
      }

      if (
        user.token.hash == "" ||
        user.token.hash != token ||
        user.token.expires <= new Date() ||
        user.token.purpose != "Verification"
      ) {
        if (user.token.purpose == "Verification") {
          user.token = {
            hash: "",
            expires: new Date(),
            purpose: "",
          };
          user.save();
        }
        console.error(
          `${user.username}(${user.id}) did not have a token initialized or provided an invalid token`,
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to verify user",
        });
      }

      user.isEmailVerified = true;
      user.token = {
        hash: "",
        expires: new Date(),
        purpose: "",
      };
      user.save();

      return;
    }),

  /**
   * Send forgot‑password email
   * @summary Initiate password reset flow
   * @description Generates a password‑reset token and emails a reset link to the member.
   */
  sendForgotPasswordEmail: publicProcedure
    .meta({
      description:
        "Generate a password‑reset token and email it to the member.",
    })
    .input(
      z.object({
        email: z.string().email().describe("[Member] Unique email"),
      }),
    )
    .output(z.void())
    .mutation(async (opts) => {
      const email = opts.input.email;

      const user = await memberModel.findOne({ email: email });

      if (!user) {
        console.error(`Member with ${email} was not found`);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send forgot password email",
        });
      }

      const token = uuidv4();
      user.token = {
        hash: token,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        purpose: "Reset Password",
      };
      user.save();

      try {
        const emailHtml = fs
          .readFileSync(
            path.join(process.cwd(), "server/email/forgotpassword.html"),
            "utf8",
          )
          .replace(
            "<custom-link>",
            `${clientEnv.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/account/resetPassword?id=${user.id}&token=${token}`,
          )
          .replace("<custom-email>", email);

        await transporter.sendMail({
          from: {
            name: "DSC Automated Mail",
            address: serverEnv.EMAIL_USER,
          },
          to: email,
          subject: "DSC Reset Account",
          html: emailHtml,
          attachments: [
            {
              filename: "dsc.svg",
              path: path.join(process.cwd(), "server/email/dsc.svg"),
              cid: "logo", //same cid value as in the html img src
            },
          ],
        });

        console.log(
          `Forgot password email sent to ${user.username}(${user.id})`,
        );
      } catch (err) {
        console.error(
          `Error generating forgot password  email for ${user.username}(${user.id}) \n`,
          err,
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send forgot password email",
        });
      }
      return;
    }),

  /**
   * Reset password
   * @summary Reset member password using token
   * @description Hashes and sets a new password after validating the reset token.
   */
  resetPassword: publicProcedure
    .meta({
      description: "Validate reset token and update the member password.",
    })
    .input(
      z.object({
        id: z.string().min(1).describe("[Member] Unique ID"),
        token: z.string().min(1).describe("[Member] Token hash"),
        newPass: z.string().min(8).describe("[Member] Unencrypted password"),
      }),
    )
    .output(z.void())
    .mutation(async (opts) => {
      const { id, token, newPass } = opts.input;

      const user = await memberModel.findById(id);

      if (!user) {
        console.error(`Member with id: ${id} was not found`);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to reset password",
        });
      }

      if (
        user.token.hash == "" ||
        user.token.hash != token ||
        user.token.expires <= new Date() ||
        user.token.purpose != "Reset Password"
      ) {
        if (user.token.purpose == "Reset Password") {
          user.token = {
            hash: "",
            expires: new Date(),
            purpose: "",
          };
          user.save();
        }
        console.error(
          `${user.username}(${user.id}) did not have a token initialized or provided an invalid token`,
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to verify user",
        });
      }

      user.password = await bcrypt.hash(newPass, 10);
      user.token = {
        hash: "",
        expires: new Date(),
        purpose: "",
      };
      user.save();

      return;
    }),
};

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
import { env } from "@/env/client";

export const authProcedures = {
  login: publicProcedure
    .input(SignInFormTypeSchema)
    .output(
      z.object({
        accessToken: z.string(),
        name: z.string(),
        role: z.string(),
      }),
    )
    .query(async (opts) => {
      const { email, password } = opts.input;

      const user = await memberModel
        .findOne({ email: email })
        .lean({ virtuals: true });

      if (!user || (await bcrypt.compare(password, user.password))) {
        console.error(`Failed to find member with email: ${email}`);
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
          id: user.id,
          userStatus: user.userStatus,
        }),
        name: user.username,
        role: user.userStatus,
      };
    }),

  registerMember: publicProcedure
    .input(SignUpFormTypeSchema)
    .output(
      z.object({
        email: z.string(),
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
          `${existingUser.username}(${existingUser.id}) is already registered but not verified`,
        );
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: `${email} is already registered, but not verified`,
        });
      }

      if (existingUser) {
        console.error(
          `${existingUser.username}(${existingUser.id}) is already registered`,
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

  sendVerificationEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
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
      user.token = {
        hash: token,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        purpose: "Verification",
      };
      user.save();

      try {
        const emailHtml = fs
          .readFileSync("../../email/verification.html", "utf8")
          .replace(
            "<custom-link>",
            `${env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/account/verification?id=${user.id}&token=${token}`,
          )
          .replace("<custom-email>", email);

        await transporter.sendMail({
          from: {
            name: "DSC Automated Mail",
            address: "membership-no-reply-f24@uwdatascience.ca", //EMAIL ADDRESS (REPLACE WHEN RELIABLE ACCOUNT IS FOUND)
          },
          to: email,
          subject: "DSC Account Confirmation",
          html: emailHtml,
          attachments: [
            {
              filename: "dsc.svg",
              path: __dirname + "../../email/dsc.svg",
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

  verifyEmail: publicProcedure
    .input(z.object({ email: z.string().email(), token: z.string().min(1) }))
    .output(z.void())
    .mutation(async (opts) => {
      const { email, token } = opts.input;

      const user = await memberModel.findOne({ email: email });

      if (!user) {
        console.error(`Member with ${email} was not found`);
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

  sendForgotPasswordEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
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
          .readFileSync("../../email/verification.html", "utf8")
          .replace(
            "<custom-link>",
            `${env.NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL}/account/resetPassword?id=${user.id}&token=${token}`,
          )
          .replace("<custom-email>", email);

        await transporter.sendMail({
          from: {
            name: "DSC Automated Mail",
            address: "membership-no-reply-f24@uwdatascience.ca", // EMAIL ADDRESS (REPLACE WHEN RELIABLE ACCOUNT IS FOUND)
          },
          to: email,
          subject: "DSC Account Confirmation",
          html: emailHtml,
          attachments: [
            {
              filename: "dsc.svg",
              path: __dirname + "../../email/dsc.svg",
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

  resetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        token: z.string().min(1),
        newPass: z.string().min(8),
      }),
    )
    .output(z.void())
    .mutation(async (opts) => {
      const { email, token, newPass } = opts.input;

      const user = await memberModel.findOne({ email: email });

      if (!user) {
        console.error(`Member with ${email} was not found`);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to reset password",
        });
      }

      if (
        user.token.hash == "" ||
        user.token.hash != token ||
        user.token.expires <= new Date() ||
        user.token.purpose != "Verification"
      ) {
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

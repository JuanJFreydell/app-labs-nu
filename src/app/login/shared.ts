import { formOptions } from "@tanstack/react-form/nextjs";
import { emailSchema, otpSchema } from "@/types/zod";

export const emailFormOpts = formOptions({
  defaultValues: {
    email: "",
  },
  validators: {
    onSubmit: emailSchema,
  },
});

export const otpFormOpts = formOptions({
  defaultValues: {
    otp: "",
  },
  validators: {
    onSubmit: otpSchema,
  },
});

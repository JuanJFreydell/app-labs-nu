"use client";

import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { requestOtp, verifyOtp } from "./actions";
import { useState, useActionState } from "react";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { emailFormOpts, otpFormOpts } from "./shared";

export default function LoginPage() {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [emailState, emailAction] = useActionState(
    requestOtp,
    initialFormState,
  );
  const [otpState, otpAction] = useActionState(verifyOtp, initialFormState);

  const formEmail = useForm({
    ...emailFormOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, emailState!),
      [emailState],
    ),
  });

  const formOtp = useForm({
    ...otpFormOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, otpState!),
      [otpState],
    ),
  });

  function handleRenderOtp() {
    if (emailState?.errors.length) return;
    setIsEmailSubmitted(true);
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-var(--spacing-header))] max-w-7xl flex-1 bg-gray-100">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image
              alt="App Lab NU"
              src="/nu-club-logo.png"
              width={100}
              height={100}
              className="h-24 w-auto"
            />
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10">
            <div>
              {!isEmailSubmitted ? (
                <form
                  action={emailAction}
                  onSubmit={() => {
                    formEmail.handleSubmit();
                    handleRenderOtp();
                  }}
                  className="space-y-6"
                >
                  <formEmail.Field name="email">
                    {(field) => (
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                            }}
                            required
                            autoComplete="email"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                          />
                        </div>
                        {field.state.meta.errors && (
                          <div className="text-sm text-red-500">
                            {field.state.meta.errors[0]?.message}
                          </div>
                        )}
                      </div>
                    )}
                  </formEmail.Field>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-red-600 checked:bg-red-600 indeterminate:border-red-600 indeterminate:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                          />
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-checked:opacity-100"
                            />
                            <path
                              d="M3 7H11"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-indeterminate:opacity-100"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="remember-me"
                        className="block text-sm/6 text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <formEmail.Subscribe
                    selector={(formState) => [
                      formState.canSubmit,
                      formState.isSubmitting,
                    ]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="flex w-full cursor-pointer justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        {isSubmitting ? "..." : "Log In"}
                      </button>
                    )}
                  </formEmail.Subscribe>
                </form>
              ) : (
                <form
                  action={otpAction}
                  onSubmit={() => {
                    formOtp.handleSubmit();
                  }}
                >
                  <formOtp.Field name="otp">
                    {(field) => (
                      <div>
                        <InputOTP
                          id="otp"
                          name="otp"
                          value={field.state.value}
                          onChange={(value) => {
                            field.handleChange(value);
                          }}
                          maxLength={6}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>

                        {field.state.meta.errors && (
                          <div className="text-sm text-red-500">
                            {field.state.meta.errors[0]?.message}
                          </div>
                        )}
                      </div>
                    )}
                  </formOtp.Field>
                  <formOtp.Subscribe
                    selector={(formState) => [
                      formState.canSubmit,
                      formState.isSubmitting,
                    ]}
                  >
                    {([canSubmit, isSubmitting]) => (
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="flex w-full cursor-pointer justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        {isSubmitting ? "..." : "Log In"}
                      </button>
                    )}
                  </formOtp.Subscribe>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          alt="Code and coffee"
          src="/app-dev-login.jpg"
          width={1000}
          height={1000}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
}

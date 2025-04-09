"use client";

import { useState } from "react";
import Image from "next/image";
import { updateProfile } from "@/app/settings/actions";
import { HiUserCircle } from "react-icons/hi2";
import { useForm, formOptions } from "@tanstack/react-form";
import { userSettingsFormSchema } from "@/zod";
import { UserSelectSchema } from "@/db/schemas";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserPhoto } from "@/supabase/upload-profile-photo";

const MAX_ARRAY_FIELD_LENGTH = 8;

export default function ProfileSettingsForm({
  user,
}: {
  user: UserSelectSchema;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);

  const {
    firstName = "",
    lastName = "",
    email,
    avatarUrl = "",
    jobTitle = "",
    linkedinUrl = "",
    githubUrl = "",
    skills = [],
    interests = [],
    isProfileComplete = false,
    isProfilePublic = false,
  } = user;

  const formOpts = formOptions({
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      email: email,
      avatarUrl: avatarUrl || "",
      jobTitle: jobTitle || "",
      linkedinUrl: linkedinUrl || "",
      githubUrl: githubUrl || "",
      skills: skills || [],
      interests: interests || [],
      isProfileComplete: isProfileComplete || false,
      isProfilePublic: isProfilePublic || false,
    },
    validators: {
      onChangeAsyncDebounceMs: 1000,
      onChangeAsync: userSettingsFormSchema,
      onSubmit: userSettingsFormSchema,
    },

    onSubmit: async () => {
      if (previewFileUrl && selectedFile) {
        URL.revokeObjectURL(previewFileUrl);

        const newAvatarUrl = await updateUserPhoto(selectedFile, avatarUrl);
        if (newAvatarUrl) {
          form.state.values.avatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET}/${newAvatarUrl}`;
        }
      }

      // Call function that performs validation and
      updateProfile(form.state.values);
    },
  });

  const form = useForm({
    ...formOpts,
  });

  // TODO: Create toast notifcation for form submission success and failure
  //
  // TODO: Improve Visibility of profile visiblitly select
  //
  // TODO: Let users delete their profile photo
  //
  // TODO: Let users delete their profile entirely
  //
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Profile
              </h2>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 border-b border-gray-900/10 py-12 sm:grid-cols-6">
                <div className="col-span-full">
                  <div className="block text-sm/6 font-medium text-gray-900">
                    Profile Visibility
                  </div>
                  <div className="mt-2 flex items-center">
                    <form.Field name="isProfilePublic">
                      {(field) => (
                        <Select
                          name="isProfilePublic"
                          onValueChange={(value) => {
                            let booleanValue = false;

                            if (value === "true") {
                              booleanValue = true;
                            }

                            field.handleChange(booleanValue);
                          }}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue
                              id="isProfilePublic"
                              placeholder={
                                field.state.value === true
                                  ? "Public"
                                  : "Private"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Public</SelectItem>
                            <SelectItem value="false">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </form.Field>
                    <p className="ml-3 text-base text-gray-700">
                      If your profile is Public, it will be displayed on our
                      members page.
                    </p>
                  </div>
                </div>
                <div className="col-span-full flex items-center gap-x-9">
                  {avatarUrl || previewFileUrl ? (
                    <>
                      <Image
                        alt={`${firstName} ${lastName}`}
                        src={previewFileUrl ? previewFileUrl : avatarUrl!}
                        width={100}
                        height={100}
                        className="size-24 flex-none rounded-lg bg-gray-800 object-cover"
                      />
                    </>
                  ) : (
                    <>
                      <HiUserCircle
                        aria-hidden="true"
                        className="size-24 text-gray-300"
                      />
                    </>
                  )}

                  <form.Field name="avatarUrl">
                    {(field) => (
                      <div>
                        <label
                          htmlFor="avatarImage"
                          className="cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-900/50"
                        >
                          <span>Upload a photo</span>
                          <input
                            id="avatarImage"
                            name="avatarImage"
                            onChange={async (e) => {
                              const imageFile = e.target.files?.[0];
                              if (!imageFile) return;
                              setSelectedFile(imageFile);
                              const blobPreview =
                                URL.createObjectURL(imageFile);
                              setPreviewFileUrl(blobPreview);

                              // const avatarUrl = await generateAvatarUrl();
                              // setGeneratedAvatarUrl(avatarUrl);
                            }}
                            type="file"
                            accept="image/png, image/jpeg"
                            className="sr-only"
                          />
                        </label>

                        <input
                          id="avatarImage"
                          name="avatarImage"
                          type="text"
                          value={field.state.value}
                          onChange={() => {
                            field.state.value = avatarUrl || "";
                          }}
                          className="hidden"
                        />
                        <p className="mt-2 text-xs/5 text-gray-400">
                          JPG or PNG. 1MB max.
                        </p>
                      </div>
                    )}
                  </form.Field>
                </div>
                <div className="sm:col-span-3">
                  <form.Field name="firstName">
                    {(field) => (
                      <>
                        <label
                          htmlFor="firstname"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          First name
                        </label>
                        <div className="mt-2">
                          <input
                            id="firstName"
                            name="firstName"
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                            }}
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                        {field.state.meta.errors && (
                          <div className="text-sm text-red-500">
                            {field.state.meta.errors[0]?.message}
                          </div>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>

                <div className="sm:col-span-3">
                  <form.Field name="lastName">
                    {(field) => (
                      <>
                        <label
                          htmlFor="lastName"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Last name
                        </label>
                        <div className="mt-2">
                          <input
                            id="lastName"
                            name="lastName"
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                            }}
                            type="text"
                            autoComplete="family-name"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                        {field.state.meta.errors && (
                          <div className="text-sm text-red-500">
                            {field.state.meta.errors[0]?.message}
                          </div>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>

                <div className="sm:col-span-full">
                  <form.Field name="email">
                    {(field) => (
                      <>
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
                            autoComplete="email"
                            value={field.state.value}
                            disabled
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                            }}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                        {field.state.meta.errors && (
                          <div className="text-sm text-red-500">
                            {field.state.meta.errors[0]?.message}
                          </div>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
              </div>

              <div className="col-span-full grid grid-cols-1 gap-x-6 gap-y-8 border-b border-gray-900/10 py-12 sm:grid-cols-6">
                {/* TODO: JOB TITLE*/}
                <div className="sm:col-span-full">
                  <form.Field name="jobTitle">
                    {(field) => (
                      <>
                        <label
                          htmlFor="jobTitle"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Job Title or Major
                        </label>
                        <div className="mt-2">
                          <input
                            id="jobTitle"
                            name="jobTitle"
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                            }}
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                        {field.state.meta.errors && (
                          <div className="text-sm text-red-500">
                            {field.state.meta.errors[0]?.message}
                          </div>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
                {/* TODO: Linkedin url*/}
                <div className="sm:col-span-3">
                  <form.Field name="linkedinUrl">
                    {(field) => (
                      <>
                        <label
                          htmlFor="linkedinUrl"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          LinkedIn
                        </label>
                        <div className="mt-2">
                          <input
                            id="linkedinUrl"
                            name="linkedinUrl"
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                            }}
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                        {field.state.meta.errors && (
                          <div className="text-sm text-red-500">
                            {field.state.meta.errors[0]?.message}
                          </div>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
                {/* TODO: githuburl*/}
                <div className="sm:col-span-3">
                  <form.Field name="githubUrl">
                    {(field) => (
                      <>
                        <label
                          htmlFor="githubUrl"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          GitHub
                        </label>
                        <div className="mt-2">
                          <input
                            id="githubUrl"
                            name="githubUrl"
                            value={field.state.value}
                            onChange={(e) => {
                              field.handleChange(e.target.value);
                            }}
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          />
                        </div>
                        {field.state.meta.errors && (
                          <div className="text-sm text-red-500">
                            {field.state.meta.errors[0]?.message}
                          </div>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
              </div>

              <div className="col-span-full grid grid-cols-1 gap-x-6 gap-y-8 border-gray-900/10 py-12 sm:grid-cols-6">
                {/* TODO: skills*/}
                <div className="sm:col-span-3">
                  <form.Field name="skills" mode="array">
                    {(field) => (
                      <>
                        <label
                          htmlFor="skills"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Skills
                        </label>
                        <p className="text-xs text-gray-400">
                          You can list up to {MAX_ARRAY_FIELD_LENGTH}{" "}
                          {field.name}.
                        </p>
                        <div className="mt-2">
                          {field.state.value.map((_, i) => {
                            return (
                              <form.Field key={i} name={`skills[${i}]`}>
                                {(subField) => {
                                  return (
                                    <div className="">
                                      <label className="mt-2 flex items-center">
                                        <input
                                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                          value={subField.state.value}
                                          onChange={(e) => {
                                            subField.handleChange(
                                              e.target.value,
                                            );
                                          }}
                                        />
                                        <Button
                                          variant="destructive"
                                          size="sm"
                                          className="hover:bg-destructive/50 ml-3 cursor-pointer"
                                          onClick={() => field.removeValue(i)}
                                        >
                                          X
                                        </Button>
                                      </label>
                                      {subField.state.meta.errors && (
                                        <div className="text-sm text-red-500">
                                          {
                                            subField.state.meta.errors[0]
                                              ?.message
                                          }
                                        </div>
                                      )}
                                    </div>
                                  );
                                }}
                              </form.Field>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              field.state.value.length >= MAX_ARRAY_FIELD_LENGTH
                            ) {
                              return;
                            }
                            field.pushValue("");
                          }}
                          disabled={
                            field.state.value.length >= MAX_ARRAY_FIELD_LENGTH
                          }
                          className="mt-2 cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-900/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          Add
                        </button>
                        {field.state.meta.errors && (
                          <div className="text-sm text-red-500">
                            {field.state.meta.errors[0]?.message}
                          </div>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
                {/* TODO: interest*/}
                <div className="sm:col-span-3">
                  <form.Field name="interests" mode="array">
                    {(field) => (
                      <>
                        <label
                          htmlFor="interests"
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Interests
                        </label>
                        <p className="text-xs text-gray-400">
                          You can list up to {MAX_ARRAY_FIELD_LENGTH}{" "}
                          {field.name}.
                        </p>
                        <div className="mt-2">
                          {field.state.value.map((_, i) => {
                            return (
                              <form.Field key={i} name={`interests[${i}]`}>
                                {(subField) => {
                                  return (
                                    <div className="">
                                      <label className="mt-2 flex items-center">
                                        <input
                                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                          value={subField.state.value}
                                          onChange={(e) => {
                                            subField.handleChange(
                                              e.target.value,
                                            );
                                          }}
                                        />
                                        <Button
                                          variant="destructive"
                                          size="sm"
                                          className="hover:bg-destructive/50 ml-3 cursor-pointer"
                                          onClick={() => field.removeValue(i)}
                                        >
                                          X
                                        </Button>
                                      </label>
                                      {subField.state.meta.errors && (
                                        <div className="text-sm text-red-500">
                                          {
                                            subField.state.meta.errors[0]
                                              ?.message
                                          }
                                        </div>
                                      )}
                                    </div>
                                  );
                                }}
                              </form.Field>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (
                              field.state.value.length >= MAX_ARRAY_FIELD_LENGTH
                            ) {
                              return;
                            }
                            field.pushValue("");
                          }}
                          disabled={
                            field.state.value.length >= MAX_ARRAY_FIELD_LENGTH
                          }
                          className="mt-2 cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-900/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                          Add
                        </button>
                        {field.state.meta.errors && (
                          <div className="text-sm text-red-500">
                            {field.state.meta.errors[0]?.message}
                          </div>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <form.Subscribe
            selector={(formState) => [
              formState.canSubmit,
              formState.isSubmitting,
            ]}
          >
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit}
                className="cursor-pointer rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                {isSubmitting ? "..." : "Save"}
              </button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}

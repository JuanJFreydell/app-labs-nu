"use client";

import { PersonCardProps } from "@/types";
import { useState } from "react";
import Image from "next/image";

export default function PersonCard({
  props,
}: {
  props: PersonCardProps;
}): React.ReactNode {
  const {
    imageUrl = null,
    firstName,
    lastName,
    jobTitle,
    clubPosition,
    email = null,
    linkedinUrl = null,
    interests = null,
    skills = null,
  } = props;

  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex-grow rounded-2xl bg-white px-8 py-10">
      {imageUrl && !imgError ? (
        <Image
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
          width={100}
          height={100}
          loading="lazy"
          unoptimized={true}
          onError={() => setImgError(true)}
          className="mx-auto size-48 rounded-full sm:size-36"
        />
      ) : (
        <span className="mx-auto flex size-48 items-center justify-center rounded-full bg-gray-200 text-3xl font-semibold sm:size-36">{`${firstName[0]}${lastName[0]}`}</span>
      )}
      <div className="max-w-xl flex-auto text-center">
        <h3 className="mt-6 text-base/7 font-semibold tracking-tight text-black">
          {`${firstName} ${lastName}`}
        </h3>
        <p className="text-sm/6 text-gray-600">{clubPosition}</p>
        <p className="text-sm/6 text-gray-600">{jobTitle}</p>

        <ul role="list" className="mt-6 flex justify-center gap-x-6">
          {email && (
            <li>
              <a
                href={`mailto:${email}`}
                className="text-gray-500 hover:text-gray-950"
              >
                <span className="sr-only">Email</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </a>
            </li>
          )}
          {linkedinUrl && (
            <li>
              <a
                href={linkedinUrl}
                className="text-gray-500 hover:text-gray-950"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          )}
        </ul>
        {interests && interests.length && (
          <>
            <h4 className="mt-6 text-left tracking-tight text-black">
              Interests
            </h4>
            <ul role="list" className="mt-6 flex flex-wrap gap-3">
              {interests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </>
        )}
        {skills && skills.length && (
          <>
            <h4 className="mt-6 text-left tracking-tight text-black">Skills</h4>
            <ul role="list" className="mt-6 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-600"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

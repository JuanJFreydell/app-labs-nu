"use client";

import React from "react";
import { FaEnvelope, FaLinkedin, FaCopy } from "react-icons/fa";
import Image from "next/image";
import type { PersonCardProps } from "@/types";

const PersonCard: React.FC<PersonCardProps> = ({
  url,
  firstName,
  lastName,
  title,
  interests,
  skills,
  position,
  linkedin,
  neuEmail,
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="relative mx-auto flex h-full w-80 flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <div className="absolute top-5 right-5 flex gap-2">
        {linkedin && (
          <a href={linkedin} className="">
            <FaLinkedin className="inline" size={20} />
          </a>
        )}

        {neuEmail && (
          <div className="group relative z-20">
            <button
              onClick={() => copyToClipboard(neuEmail)}
              className="hover:opacity-80"
              title="Click to copy email"
            >
              <FaEnvelope className="inline" size={20} />
            </button>
            <div className="absolute right-0 -bottom-10 z-50 hidden items-center gap-2 rounded-md bg-gray-800 px-3 py-1 text-sm whitespace-nowrap text-white group-hover:flex">
              {neuEmail}
              <FaCopy size={14} />
            </div>
          </div>
        )}
      </div>

      {/* Profile Picture */}
      <div className="mb-6 flex justify-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-red-600 shadow-md">
          {url && (
            <Image
              src={url}
              alt={`${firstName} ${lastName}`}
              width={100}
              height={100}
              unoptimized={true}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Name, Title, and LinkedIn */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-black">
          {firstName} {lastName}
        </h2>
        <p className="mb-4 text-sm text-gray-600">{title}</p>
      </div>

      {/* Position */}
      {position && (
        <div className="mb-4 text-center">
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-600">
            {position}
          </span>
        </div>
      )}

      {/* Dynamic Content */}
      <div className="flex-1">
        {/* Interests */}
        {interests && interests.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-black">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 className="mb-2 text-lg font-semibold text-black">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonCard;

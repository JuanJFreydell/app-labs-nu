import React from "react";

interface PersonCardProps {
  url: string; // Picture URL
  firstName: string;
  lastName: string;
  title: string; // Title or role (e.g., "Software Engineer")
  interests?: string[]; // Optional: List of interests
  skills?: string[]; // Optional: List of skills
  position?: string; // Optional: Role in the organization (e.g., "Student" or "Advisor")
}

const PersonCard: React.FC<PersonCardProps> = ({
  url,
  firstName,
  lastName,
  title,
  interests,
  skills,
  position,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-80 mx-auto border border-gray-200 flex flex-col h-full">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-red-600 shadow-md">
          <img
            src={url}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name and Title */}
      <h2 className="text-xl font-bold text-black text-center">
        {firstName} {lastName}
      </h2>
      <p className="text-gray-600 text-center text-sm mb-4">{title}</p>

      {/* Position */}
      {position && (
        <div className="text-center mb-4">
          <span className="bg-red-100 text-red-600 px-3 py-1 text-xs rounded-full">
            {position}
          </span>
        </div>
      )}

      {/* Dynamic Content */}
      <div className="flex-1">
        {/* Interests */}
        {interests && interests.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-black mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 text-xs rounded-full"
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
            <h3 className="text-lg font-semibold text-black mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-600 px-3 py-1 text-xs rounded-full"
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

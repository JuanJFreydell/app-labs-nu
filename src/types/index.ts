export interface PersonCardProps {
  imageUrl?: string | null;
  firstName: string;
  lastName: string;
  jobTitle: string;
  clubPosition: string;
  email?: string | null;
  linkedinUrl?: string | null;
  interests?: string[] | null;
  skills?: string[] | null;
}

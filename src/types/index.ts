export interface PersonCardProps {
  url?: string; // Picture URL
  firstName: string;
  lastName: string;
  title: string; // Title or role (e.g., "Software Engineer")
  interests?: string[]; // Optional: List of interests
  skills?: string[]; // Optional: List of skills
  position?: string; // Optional: Role in the organization (e.g., "Student" or "Advisor")
  linkedin?: string; // Optional: LinkedIn profile URL
  neuEmail?: string; // Optional: NEU email
  phone?: string; // Optional: Phone number
}

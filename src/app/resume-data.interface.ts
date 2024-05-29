


export interface ResumeData {
  title: string;
  details?: string | string[];
  full?: string | string[];
  PROFESSIONAL_SUMMARY_TITLE: string;
  PROFESSIONAL_SUMMARY_DETAILS: string;
  PROFESSIONAL_SUMMARY_FULL: string;
  WORK_EXPERIENCE_TITLE: string;
  WORK_EXPERIENCE_DETAILS: string;
  WORK_EXPERIENCE_FULL: WorkExperience[];
  EDUCATION_TITLE: string;
  EDUCATION_DETAILS: string;
  EDUCATION_FULL: Education;
  CERTIFICATIONS_TITLE: string;
  CERTIFICATIONS_DETAILS: string;
  CERTIFICATIONS_FULL: string[];
  ADDITIONAL_SKILLS_TITLE: string;
  ADDITIONAL_SKILLS_DETAILS: string;
  ADDITIONAL_SKILLS_FULL: string[];
  LANGUAGES_TITLE: string;
  LANGUAGES_DETAILS: string;
  LANGUAGES_FULL: Language;
  INTERESTS_TITLE: string;
  INTERESTS_DETAILS: string;
  INTERESTS_FULL: string[];
}

interface WorkExperience {
  TITLE: string;
  COMPANY: string;
  DATES: string;
  DESCRIPTION: string[];
}

interface Education {
  DEGREE: string;
  INSTITUTION: string;
  GRADUATION_YEAR: number;
}

interface Language {
  ARABIC: string;
  ENGLISH: string;
  FRENCH: string;
  DUTCH: string;
}
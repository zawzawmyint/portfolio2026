export type Tool = {
  image: string;
  text: string;
  level: string;
};

export type Project = {
  name: string;
  description: string;
  stacks: string[];
  image: string;
  demo: string;
  github: string;
};

export type WorkExperience = {
  position: string;
  company: string;
  company_link: string;
  companyImage: string;
  location: string;
  project: string;
  skills: string;
  period: string;
  tasks: string[];
};

export type Blog = {
  title: string;
  date: string;
  link: string;
  image: string;
  description: string;
  tags: string[];
};
export type Contact = {
  icon: React.ReactNode;
  text: string;
  linkto: string;
};

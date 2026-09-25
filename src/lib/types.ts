export type BannerSlide = {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
};

export type SiteContent = {
  banner: BannerSlide[];
  hero: {
    kicker: string;
    heading: string;
    subheading: string;
  };
  about: {
    heading: string;
    text: string;
    team: TeamMember[];
  };
  contactInfo: {
    phoneDisplay: string;
    whatsappNumber: string;
    email: string;
    address: string;
    scheduleWeekdays: string;
    scheduleSaturday: string;
  };
  stats: StatItem[];
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

export type StatItem = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  order: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  photo: string;
  approved: boolean;
  date: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  likes: number;
  published: boolean;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
};

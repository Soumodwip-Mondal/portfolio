/**
 * Navigation links for the site
 */
export const NAVIGATION_LINKS = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  
  /**
   * Social media links
   */
  export const SOCIAL_LINKS = [
    { 
      platform: "GitHub", 
      url: "https://github.com/yourusername", 
      icon: "github" 
    },
    { 
      platform: "LinkedIn", 
      url: "https://linkedin.com/in/yourusername", 
      icon: "linkedin" 
    },
    { 
      platform: "Twitter", 
      url: "https://twitter.com/yourusername", 
      icon: "twitter" 
    },
  ];
  
  /**
   * Technical skill categories
   */
  export const SKILL_CATEGORIES = [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase"]
    },
    {
      name: "Tools",
      skills: ["Git", "GitHub", "VS Code", "Figma", "Vercel"]
    }
  ];
  
  /**
   * Contact form initial state
   */
  export const CONTACT_FORM_INITIAL_STATE = {
    name: "",
    email: "",
    message: ""
  };
  
  /**
   * Site metadata
   */
  export const SITE_CONFIG = {
    title: "Your Name | Portfolio",
    description: "Professional portfolio showcasing projects and skills in web development",
    author: "Your Name",
    siteUrl: "https://yourportfolio.com",
    themeColor: "#ffffff",
    locale: "en_US"
  };
export const siteName = "Dylan Afriyie";

export const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/credentials", label: "Credentials" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavItem = (typeof primaryNav)[number];

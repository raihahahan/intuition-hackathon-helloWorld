import { siteTitle } from "./site-layout";
import { routes } from "./site-types";

export const siteTitleNames: Record<routes, string> = {
  "/": "",
  "/input": "Input",
  "/history": "History",
  "/contact": "Contact",
  "/privacy-policy": "Privacy Policy",
  "/terms-of-use": "Terms of Use",
};

export function makeSiteTitle(title: string) {
  if (title == "" || !title) {
    return siteTitle;
  } else {
    return title + " | " + siteTitle;
  }
}

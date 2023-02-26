import { anchorTitles, routes } from "./site-types";

const anchorData: { title: anchorTitles; anchorRoute: routes }[] = [
  { title: "", anchorRoute: "/" },
  {
    title: "History",
    anchorRoute: "/history",
  },
  {
    title: "About",
    anchorRoute: "/about",
  },
];

export default anchorData;

export const footerData: { title: anchorTitles; anchorRoute: routes }[] = [
  {
    title: "stockr.io" as any,
    anchorRoute:
      "https://github.com/raihahahan/intuition-hackathon-helloWorld" as routes,
  },
  {
    title: "Privacy Policy",
    anchorRoute: "/privacy-policy",
  },
];

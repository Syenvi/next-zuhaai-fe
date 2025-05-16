import { Manrope } from "next/font/google";

export const manropeSans = Manrope({
  variable: "--manropeSans-font",
  subsets: ["latin"],
  display: "fallback",
  weight: ["300", "400", "500", "600", "700", "800"],
});

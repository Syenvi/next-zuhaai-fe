import { Nunito } from "next/font/google";

export const nunitoSans = Nunito({
  variable: "--nunitoSans-font",
  subsets: ["latin"],
  display: "fallback",
  weight: ["300", "400", "500", "600", "700", "800"],
});

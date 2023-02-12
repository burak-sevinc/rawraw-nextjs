import { Roboto_Mono } from "@next/font/google";

const robotoFont = Roboto_Mono({
  subsets: ["latin", "latin-ext"],
});

export default function GetFont() {
  return robotoFont;
}

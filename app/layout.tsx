import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/themes";
import "./globals.css";

const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Anukriti Tripathi — Designer",
  description:
    "Portfolio of Anukriti Tripathi, a designer working across digital and physical products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <div id="content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

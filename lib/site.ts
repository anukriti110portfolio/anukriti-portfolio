import type { Metadata } from "next";

export const siteConfig = {
  name: "Anukriti Tripathi",
  nameDevanagari: "अनुकृति त्रिपाठी",
  role: "Product & Interaction Designer",
  email: "anukrititripathi22@gmail.com",
  linkedin: "",
  instagram: "",
  github: "",
  resumePath: "",
};

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
);

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = path ? new URL(path, siteUrl).toString() : siteUrl.toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

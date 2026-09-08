import type { MetadataRoute } from "next";
import { getNotes, getPlaygroundItems, getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/work",
    "/playground",
    "/field-notes",
    "/about",
    "/connect",
  ].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = getProjects().map((file) => ({
    url: new URL(`/work/${file.slug}`, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const playgroundRoutes = getPlaygroundItems().map((file) => ({
    url: new URL(`/playground/${file.slug}`, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const noteRoutes = getNotes().map((file) => ({
    url: new URL(`/field-notes/${file.slug}`, siteUrl).toString(),
    lastModified: file.frontmatter.date ? new Date(file.frontmatter.date) : new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...playgroundRoutes, ...noteRoutes];
}

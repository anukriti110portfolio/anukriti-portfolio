import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ProjectFrontmatter = {
  title: string;
  subtitle?: string;
  year?: string;
  category?: string;
  role?: string;
  tools?: string[];
  duration?: string;
  order?: number;
};

export type ContentFile<TFrontmatter> = {
  slug: string;
  frontmatter: TFrontmatter;
  body: string;
};

function readCollection<TFrontmatter>(folder: string): ContentFile<TFrontmatter>[] {
  const dir = path.join(CONTENT_ROOT, folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".mdx") && !name.startsWith("_"))
    .map((name) => {
      const raw = fs.readFileSync(path.join(dir, name), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: name.replace(/\.mdx$/, ""),
        frontmatter: data as TFrontmatter,
        body: content,
      };
    });
}

export function getProjects(): ContentFile<ProjectFrontmatter>[] {
  return readCollection<ProjectFrontmatter>("projects").sort(
    (a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99)
  );
}

export function getProject(
  slug: string
): ContentFile<ProjectFrontmatter> | undefined {
  return getProjects().find((file) => file.slug === slug);
}

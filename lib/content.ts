import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ProjectFrontmatter = {
  title: string;
  subtitle?: string;
  whatIf?: string;
  year?: string;
  category?: string;
  role?: string;
  tools?: string[];
  duration?: string;
  order?: number;
  cover?: string;
  video?: string;
  prototypeUrl?: string;
  prototypeLabel?: string;
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

export type PlaygroundFrontmatter = {
  title: string;
  category: string;
  date?: string;
  description?: string;
  tools?: string[];
  skills?: string[];
  cover?: string;
  video?: string;
  figmaUrl?: string;
  externalUrl?: string;
  codeUrl?: string;
};

export function getPlaygroundItems(): ContentFile<PlaygroundFrontmatter>[] {
  return readCollection<PlaygroundFrontmatter>("playground").sort((a, b) => {
    const dateA = a.frontmatter.date ?? "0000-00-00";
    const dateB = b.frontmatter.date ?? "0000-00-00";
    return dateB.localeCompare(dateA);
  });
}

export function getPlaygroundItem(
  slug: string
): ContentFile<PlaygroundFrontmatter> | undefined {
  return getPlaygroundItems().find((file) => file.slug === slug);
}

export type StudioItemFrontmatter = {
  title: string;
  kind?: string;
  year?: string;
  image?: string;
  videoUrl?: string;
  externalUrl?: string;
  description?: string;
};

export function getStudioItems(): ContentFile<StudioItemFrontmatter>[] {
  return readCollection<StudioItemFrontmatter>("studio").sort((a, b) => {
    const yearA = a.frontmatter.year ?? "0000";
    const yearB = b.frontmatter.year ?? "0000";
    return yearB.localeCompare(yearA);
  });
}

export type NoteFrontmatter = {
  title: string;
  date?: string;
  category?: string;
  tags?: string[];
  cover?: string;
  description?: string;
};

export function getNotes(): ContentFile<NoteFrontmatter>[] {
  return readCollection<NoteFrontmatter>("blog").sort((a, b) => {
    const dateA = a.frontmatter.date ?? "0000-00-00";
    const dateB = b.frontmatter.date ?? "0000-00-00";
    return dateB.localeCompare(dateA);
  });
}

export function getNote(
  slug: string
): ContentFile<NoteFrontmatter> | undefined {
  return getNotes().find((file) => file.slug === slug);
}

export function getReadingTime(body: string): number {
  const words = body
    .replace(/[#>*`\-\[\]()!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  const monthName = MONTHS[Number(month) - 1] ?? "";
  return [day, monthName, year].filter(Boolean).join(" ");
}

export type ProjectNeighbors = {
  prev: ContentFile<ProjectFrontmatter> | undefined;
  next: ContentFile<ProjectFrontmatter> | undefined;
};

export function getProjectNeighbors(slug: string): ProjectNeighbors {
  const projects = getProjects();
  const index = projects.findIndex((file) => file.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };

  return {
    prev: projects[index - 1],
    next: projects[index + 1],
  };
}

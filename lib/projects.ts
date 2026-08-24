export type Project = {
  slug: string;
  title: string;
  category?: string;
  year?: string;
};

export const projects: Project[] = [
  { slug: "smart-camera", title: "Smart Camera" },
  { slug: "bodhichitt", title: "Bodhichitt" },
  {
    slug: "indian-visa-online-heuristic-evaluation",
    title: "Indian Visa Online — Heuristic Evaluation",
    category: "Heuristic Evaluation",
  },
  {
    slug: "ergonomic-workstation-research",
    title: "Ergonomic Workstation Research",
    category: "Design Research",
  },
  {
    slug: "physical-product-form-design",
    title: "Physical Product / Form Design",
    category: "Physical Product",
  },
];

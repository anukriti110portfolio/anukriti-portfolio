import { evaluate } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";
import Facts from "@/components/Facts";
import Figure from "@/components/Figure";
import Flow from "@/components/Flow";
import ImageGallery from "@/components/ImageGallery";
import Lead from "@/components/Lead";
import Section from "@/components/Section";
import Spread from "@/components/Spread";
import Steps from "@/components/Steps";
import styles from "./MdxContent.module.css";

type MdxContentProps = {
  source: string;
  /** Full-width editorial layout (use with <Section> blocks). */
  wide?: boolean;
};

type MdxImageProps = {
  src?: string;
  alt?: string;
  title?: string;
};

export default async function MdxContent({ source, wide }: MdxContentProps) {
  const { default: MdxComponent } = await evaluate(source, {
    Fragment: jsxRuntime.Fragment,
    jsx: jsxRuntime.jsx,
    jsxs: jsxRuntime.jsxs,
  });

  return (
    <div className={wide ? `${styles.prose} ${styles.wide}` : styles.prose}>
      <MdxComponent
        components={{
          Gallery: ImageGallery,
          Section,
          Lead,
          Flow,
          Facts,
          Steps,
          Spread,
          img: (props: MdxImageProps) => (
            <Figure
              src={props.src ?? ""}
              alt={props.alt ?? ""}
              caption={typeof props.title === "string" ? props.title : undefined}
            />
          ),
        }}
      />
    </div>
  );
}

import { evaluate } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";
import Figure from "@/components/Figure";
import ImageGallery from "@/components/ImageGallery";
import styles from "./MdxContent.module.css";

type MdxContentProps = {
  source: string;
};

type MdxImageProps = {
  src?: string;
  alt?: string;
  title?: string;
};

export default async function MdxContent({ source }: MdxContentProps) {
  const { default: MdxComponent } = await evaluate(source, {
    Fragment: jsxRuntime.Fragment,
    jsx: jsxRuntime.jsx,
    jsxs: jsxRuntime.jsxs,
  });

  return (
    <div className={styles.prose}>
      <MdxComponent
        components={{
          Gallery: ImageGallery,
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

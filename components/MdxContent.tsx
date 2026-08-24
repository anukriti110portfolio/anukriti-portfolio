import { evaluate } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";
import styles from "./MdxContent.module.css";

type MdxContentProps = {
  source: string;
};

export default async function MdxContent({ source }: MdxContentProps) {
  const { default: MdxComponent } = await evaluate(source, {
    Fragment: jsxRuntime.Fragment,
    jsx: jsxRuntime.jsx,
    jsxs: jsxRuntime.jsxs,
  });

  return (
    <div className={styles.prose}>
      <MdxComponent />
    </div>
  );
}

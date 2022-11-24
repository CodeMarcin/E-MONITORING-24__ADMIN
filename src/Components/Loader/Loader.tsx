import { Portal } from "../Portal/Portal";

import { SVGLoader } from "../../Utilities/SVG";

import { LOADER_LABELS } from "./Loader.labels";

import styles from "./Loader.module.css";

export const Loader = (props: { type: TLoaderType }) => {
  const { type } = props;
  const text = LOADER_LABELS[type]
  return (
    <Portal>
      <div className={styles["loader"]}>
        <div className={styles["container"]}>
          <div className={styles["popup"]}>
            <SVGLoader size={100} />
            <div className={styles["popup__text"]}>{text}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

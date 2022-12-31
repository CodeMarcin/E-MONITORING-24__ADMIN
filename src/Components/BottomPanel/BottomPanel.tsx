import { Portal } from "../Portal/Portal";
import { Button } from "../Button/Button";

import { useStyles } from "../../Hooks/useStyles";

import styles from "./BottomPanel.module.css";

export const BottomPanel = (props: { buttons: IButtonProps[] }) => {
  const { buttons } = props;
  return (
    <Portal>
      <div className={styles["bottom-panel"]}>
        <div className={useStyles("container--main", styles["container"], buttons.length === 1 ? styles["container--reverse"] : "")}>
          {buttons.map((el, index) => (
            <Button items={el} key={index} />
          ))}
        </div>
      </div>
    </Portal>
  );
};

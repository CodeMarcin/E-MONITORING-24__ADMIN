import { useStyles } from "../../Hooks/useStyles";

import styles from "./Button.module.css";

export const Button = (props: { items: IButtonProps }) => {
  const { items } = props;
  const { type, width, center, value, callbacks } = items;
  const { onClickCallback } = callbacks;

  const buttonType = type === "BASIC" ? styles["button--basic"] : styles["button--second"];
  const buttonWidth = width === "FULL" ? styles["button--full-width"] : styles["button--flex-width"];
  const buttonPosition = center ? styles['button--position-center'] : "";

  const buttonStyles = useStyles(styles["button"], buttonType, buttonWidth, buttonPosition);

  return <input type="button" className={buttonStyles} value={value} onClick={onClickCallback} />;

};

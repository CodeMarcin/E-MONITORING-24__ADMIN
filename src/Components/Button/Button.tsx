import { useStyles } from "../../Hooks/useStyles";

import styles from "./Button.module.css";

export const Button = (props: { items: IButtonProps }) => {
  const { items } = props;
  const { type, width, value, callbacks } = items;
  const { onClickCallback } = callbacks;

  const buttonType = type === "BASIC" ? styles["button--basic"] : styles["button--second"];
  const buttonWidth = width === "FULL" ? styles["button--full-width"] : styles["button--flex-width"];

  const buttonStyles = useStyles(styles["button"], buttonType, buttonWidth);

  return <input type="button" className={buttonStyles} value={value} onClick={onClickCallback} />;

};

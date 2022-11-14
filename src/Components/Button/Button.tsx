import { useStyles } from "../../Hooks/useStyles";

import { IButtonProps } from "./Typescript/Button.interface";
import { EButtonType, EButtonWidth } from "./Typescript/Button.enum";

import styles from "./Button.module.css";

export const Button = ({ props }: IButtonProps) => {
  const { type, width, value, callbacks } = props;
  const { onClickCallback } = callbacks;

  const buttonType = type === EButtonType.BASIC ? styles["button--basic"] : EButtonType.SECOND && styles["button--second"];
  const buttonWidth = width === EButtonWidth.FULL ? styles["button--full-width"] : EButtonWidth.FLEX && styles["button--flex-width"];

  const buttonStyles = useStyles(styles["button"], buttonType, buttonWidth);

  return <input type="button" className={buttonStyles} value={value} onClick={onClickCallback} />;
};

import { useStyles } from "../../Hooks/useStyles";

import { ButtonBasic } from "./ButtonBasic";
import { ButtonSecond } from "./ButtonSecond";

import { IButtonProps, ISpecifyButton } from "./ButtonInterface";

import styles from "./Button.module.css";

interface Props {
  props: IButtonProps;
}

export const Button: React.FC<Props> = ({ props }: Props) => {
  const { type, width, value, callbacks } = props;
  const { onClickCallback } = callbacks ?? {};
  const buttonType = type === "BASIC" ? styles["button--basic"] : type === "SECOND" ? styles["button--second"] : styles["button-basic"];
  const buttonWidth = width === "FULL" ? styles["button--full-width"] : width === "FLEX" ? styles["button--flex-width"] : styles["button--full-width"];
  const buttonStyles = useStyles(styles["button"], buttonType, buttonWidth);

  const buttonProps: ISpecifyButton = {
    className: buttonStyles,
    value: value,
    callbacks: {
      onClickCallback,
    },
  };

  return (
    <>
      {type === "BASIC" && <ButtonBasic props={buttonProps} />} {type === "SECOND" && <ButtonSecond props={buttonProps} />}
    </>
  );
};

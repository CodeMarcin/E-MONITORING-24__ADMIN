import { IButtonProps, IButtonStyles } from "./ButtonInterface";
import { ButtonBasic } from "./ButtonBasic";
import { ButtonSecond } from "./ButtonSecond";
import { useStyles } from "../../Hooks/useStyles";
import styles from "./Button.module.css";

interface Props {
  props: IButtonProps;
}

export const Button: React.FC<Props> = ({ props }: Props) => {
  const { type, width, value } = props;
  const buttonType = type === "BASIC" ? styles["button--basic"] : type === "SECOND" ? styles["button--second"] : styles["button-basic"];
  const buttonWidth = width === "FULL" ? styles["button--full-width"] : width === "FLEX" ? styles["button--flex-width"] : styles["button--full-width"];
  const buttonStyles = useStyles(styles["button"], buttonType, buttonWidth);

  const buttonProps: IButtonStyles = {
    className: buttonStyles,
    value: value,
  };

  return (
    <>
      {type === "BASIC" && <ButtonBasic props={buttonProps} />} {type === "SECOND" && <ButtonSecond props={props} />}
    </>
  );
};

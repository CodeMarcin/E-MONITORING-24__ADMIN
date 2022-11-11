import { IInputTextNumberPasswordProps } from "../../Components/Input/InputInterface";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";
import { SVGTopLoginIcon } from "../../Utilities/SVG";
import { LOGIN_LABELS } from "./LoginLabels";
import styles from "./Login.module.css";
import { IButtonProps } from "../../Components/Button/ButtonInterface";

const loginInputProps: IInputTextNumberPasswordProps = {
  type: "text",
  label: LOGIN_LABELS.LOGIN,
};
const passwordInputProps: IInputTextNumberPasswordProps = {
  type: "password",
  label: LOGIN_LABELS.PASSWORD,
};

const buttonLoginProps: IButtonProps = {
  type: "BASIC",
  width: "FULL",
  value: LOGIN_LABELS.LOGIN_BUTTON
};

export const Login = () => {
  return (
    <div className={styles["login"]}>
      <SVGTopLoginIcon size={100} color={"#7a7a7a"} />
      <Input props={loginInputProps} />
      <Input props={passwordInputProps} />
      <Button props={buttonLoginProps} />
    </div>
  );
};

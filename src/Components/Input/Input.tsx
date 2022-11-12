import { InputTextNumberPassword } from "./InputTextNumberPassword";

import { IInputTextNumberPasswordProps, IInputTextArea } from "./InputInterface";

import styles from "./Input.module.css";

interface Props {
  props: IInputTextNumberPasswordProps | IInputTextArea;
}

export const Input: React.FC<Props> = ({ props }: Props) => {
  const { type, canGotErrors } = props;


  return (
    <label className={styles["label"]}>
      {(type === "text" || type === "number" || type === "password") && <InputTextNumberPassword props={props} />}
      {canGotErrors && <p className={styles["input-error"]}>ss</p>}
    </label>
  );
};

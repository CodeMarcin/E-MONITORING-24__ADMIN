import { IInputTextNumberPasswordProps, IInputTextArea } from "./InputInterface";
import { InputTextNumberPassword } from "./InputTextNumberPassword";
import styles from "./Input.module.css";

interface Props {
  props: IInputTextNumberPasswordProps | IInputTextArea;
}

export const Input: React.FC<Props> = ({ props }: Props) => {
  const { type } = props;

  return <label className={styles["label"]}>{(type === "text" || type === "number" || type === "password") && <InputTextNumberPassword props={props} />}</label>;
};

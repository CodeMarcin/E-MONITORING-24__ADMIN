import { IInputTextNumberPasswordProps } from "./InputInterface";
import styles from "./Input.module.css";

export interface Props {
  props: IInputTextNumberPasswordProps;
}

export const InputTextNumberPassword: React.FC<Props> = ({ props }: Props) => {
  const { type, label, maxLength, minLength } = props;

  return <input className={styles["inputTextNumberPassword"]} maxLength={maxLength} minLength={minLength} type={type} placeholder={label} />;
};

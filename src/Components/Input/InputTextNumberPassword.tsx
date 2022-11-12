import { IInputTextNumberPasswordProps } from "./InputInterface";
import styles from "./Input.module.css";

export interface Props {
  props: IInputTextNumberPasswordProps;
}

export const InputTextNumberPassword: React.FC<Props> = ({ props }: Props) => {
  const { type, label, name, maxLength, minLength, callbacks } = props;
  const { onChangeCallback } = callbacks ?? {};

  return <input className={styles["inputTextNumberPassword"]} maxLength={maxLength} minLength={minLength} type={type} placeholder={label} data-index={name} onChange={onChangeCallback} />;
};

import { IButtonProps } from "./ButtonInterface";
import styles from "./Button.module.css";

export interface Props {
  props: IButtonProps;
}

export const ButtonSecond: React.FC<Props> = ({ props }: Props) => {
  return <div>ButtonSecond</div>;
};

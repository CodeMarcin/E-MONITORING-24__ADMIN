import { IButtonStyles } from "./ButtonInterface";
import styles from "./Button.module.css";

export interface Props {
  props: IButtonStyles;
}

export const ButtonBasic: React.FC<Props> = ({ props }: Props) => {
    const {className, value} = props;
  return <input type="button" className={className} value={value} />;
};

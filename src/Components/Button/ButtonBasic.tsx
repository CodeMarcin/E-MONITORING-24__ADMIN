import { ISpecifyButton } from "./ButtonInterface";

export interface Props {
  props: ISpecifyButton;
}

export const ButtonBasic: React.FC<Props> = ({ props }: Props) => {
  const { className, value, callbacks } = props;
  const { onClickCallback } = callbacks ?? {};
  return <input type="button" className={className} value={value} onClick={onClickCallback}/>;
};

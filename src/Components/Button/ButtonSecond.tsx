import { ISpecifyButton } from "./ButtonInterface";


export interface Props {
  props: ISpecifyButton;
}

export const ButtonSecond: React.FC<Props> = ({ props }: Props) => {
  return <div>ButtonSecond</div>;
};

import { EButtonType, EButtonWidth } from "./Button.enum";

export interface IButtonProps {
  props: {
    type: EButtonType;
    width: EButtonWidth;
    value: string;
    callbacks: {
      onClickCallback: () => void;
    };
  };
}

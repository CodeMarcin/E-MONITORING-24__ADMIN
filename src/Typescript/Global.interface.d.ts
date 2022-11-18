import * as ENUM from "./Global.enum";

export {};
declare global {
  // BUTTON PROPS
  interface IButtonProps {
    type: TButtonType;
    width: TButtonWidth;
    value: string;
    callbacks: {
      onClickCallback: () => void;
    };
  }

  // POPOP MODAL PROPS
  interface IPopupModalProps {
    title: string;
    icon?: TPopupModalIcon;
    text?: string;
    buttons: IButtonProps[];
  }

  interface IHeaderProps {
    title: string;
    subtitle: string;
  }
}

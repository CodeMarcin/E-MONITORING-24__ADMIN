export {};
declare global {
  // BUTTON COMPONENT
  // @PROPS
  interface IButtonProps {
    type: TButtonType;
    width: TButtonWidth;
    value: string;
    center?: boolean;
    callbacks: {
      onClickCallback: () => void;
    };
  }

  // INPUT COMPONENT
  // @PROPS
  interface IInputProps {
    type: TInputType;
    label: string;
    name: string;
    value: string;
    showName: boolean;
    minLength?: number;
    maxLength?: number;
    validateList?: TValidataList[];
    errorList?: string[];
  }

  interface IInputCallbacks {
    onChangeCallback: (e: React.FormEvent<HTMLInputElement>) => void;
  }

  // POPOP MODAL COMPONENT
  // @PROPS
  interface IPopupModalProps {
    show: boolean;
    title: string;
    icon?: TPopupModalIcon;
    text?: string;
    buttons: IButtonProps[];
    checkbox?: IInputProps;
    toggleModalCallback: () => void;
  }

  // HEADER COMPONENT
  // @PROPS
  interface IHeaderProps {
    title: string;
    subtitle: string;
  }

  // ACCORDION COMPONENT
  // @PROPS
  interface IAccordionProps {
    title: string;
    leftSection: IAccordionPropsLeftSection;
    rightSection: boolean;
    rightSectionCallbacks?: IAccordionPropsRightSectionCallbacks;
    bottomMenu: IAccordionPropsBottomMenu[];
  }

  interface IAccordionPropsLeftSection {
    leftTitle?: string;
    leftContent: string[];
    NIP: string;
  }

  interface IAccordionPropsRightSectionCallbacks {
    loopCallback: () => void;
    saveCallback: () => void;
    sendCallback: () => void;
  }

  interface IAccordionPropsBottomMenu {
    label: string;
    action: string | (() => void);
  }

  // MAIN MENU COMPONENT
  export interface IMainMenuItems {
    name: string;
    label: string;
    link?: string;
    active?: boolean;
    subItems?: IMainMenuSubItems[];
  }

  export interface IMainMenuSubItems {
    name: string;
    label: string;
    link: string;
  }

  // SORT SETTINGS
  export interface ISort {
    sortBy: string;
    sortType: "desc" | "asc";
    limit: number;
  }
}

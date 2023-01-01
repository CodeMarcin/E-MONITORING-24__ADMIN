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
      onClickCallback: TButtonOnClickCallback;
    };
  }

  // INPUT COMPONENT
  // @PROPS
  interface IInputProps {
    id?: string;
    type: TInputType;
    label: string;
    name: string;
    value: string;
    originalValue?: string;
    showName: boolean;
    minLength?: number;
    maxLength?: number;
    step?: number;
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
    subtitle?: string;
  }

  // ACCORDION COMPONENT
  // @PROPS
  interface IAccordionProps {
    id?: string;
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

  // LOCAL STORAGE INVOICE ADD
  export interface ILocalStorageInvoiceAdd {
    step: number;
    selectedContractorID: string;
    selectedPaymentMethod: string;
    contractor: IInputProps[];
    company: IInputProps[];
    invoiceSettings: IInputProps[];
    paymentSettings: IInputProps[];
  }

  // SELECT
  export interface ISelect {
    name: string;
    values: ISelectValues[];
  }

  export interface ISelectValues {
    value?: string | number;
    label: string;
  }

  // INVOICE ADD
  export interface IInvoiceAddSettings {
    contractors: IContractorAPI[];
    paymentSettings: IPaymentAPI;
    dataForSelectContractor: ISelect;
    dataForSelectPayment: ISelect;
    dataForSelectItems :ISelect;
    selectedContractor: string;
    selectedPaymentMethod: string;
  }
  
  export interface IInvoiceAdd {
    contractor: IInputProps[];
    company: IInputProps[];
    invoiceSettings: IInputProps[];
    paymentSettings: IInputProps[];
    items: IItem[];
    totalValue: number;
  }

  export interface IItem {
    standard: string;
    totalPrice: number;
    item: IInputProps[];
  }
}

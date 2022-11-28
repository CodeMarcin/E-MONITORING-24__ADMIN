import { CONTRATOR_ADD_EDIT_LABELS } from "./ContractorAddEdit.labels";

export const ADD_EDIT_CONTRATOR_INPUTS_PROPS: IInputProps[] = [
  {
    label: CONTRATOR_ADD_EDIT_LABELS.NAME,
    type: "text",
    name: "name",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: CONTRATOR_ADD_EDIT_LABELS.ADDRESS,
    type: "text",
    name: "address",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: CONTRATOR_ADD_EDIT_LABELS.ZIPCODE,
    type: "text",
    name: "zipcode",
    value: "",
    showName: true,
    validateList: ["ZIP_CODE_VALIDATE", "IS_EMPTY"],
    errorList: [],
    maxLength: 6,
  },
  {
    label: CONTRATOR_ADD_EDIT_LABELS.CITY,
    type: "text",
    name: "city",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: CONTRATOR_ADD_EDIT_LABELS.EMAIL,
    type: "text",
    name: "email",
    value: "",
    showName: true,
  },
  {
    label: CONTRATOR_ADD_EDIT_LABELS.NIP,
    type: "text",
    name: "nip",
    value: "",
    showName: true,
    validateList: ["IS_NIP_EXIST", "IS_EMPTY", "NIP_VALIDATE"],
    errorList: [],
    maxLength: 13,
  },
];

export const HEADER_ADD_PROPS: IHeaderProps = {
  title: CONTRATOR_ADD_EDIT_LABELS.HEADER_TITLE,
  subtitle: CONTRATOR_ADD_EDIT_LABELS.HEADER_ADD_SUBTITLE,
};

export const HEADER_EDIT_PROPS: IHeaderProps = {
  title: CONTRATOR_ADD_EDIT_LABELS.HEADER_TITLE,
  subtitle: CONTRATOR_ADD_EDIT_LABELS.HEADER_EDIT_SUBTITLE,
};

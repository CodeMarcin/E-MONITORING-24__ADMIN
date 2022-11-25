import { CONTRATOR_ADD_LABELS } from "./ContractorAdd.labels";

export const ADD_CONTRATOR_INPUTS_PROPS: IInputProps[] = [
  {
    label: CONTRATOR_ADD_LABELS.NAME,
    type: "text",
    name: "contractor-name",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: CONTRATOR_ADD_LABELS.ADDRESS,
    type: "text",
    name: "contractor-address",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: CONTRATOR_ADD_LABELS.ZIPCODE,
    type: "text",
    name: "contractor-zipcode",
    value: "",
    showName: true,
    validateList: ["ZIP_CODE_VALIDATE", "IS_EMPTY"],
    errorList: [],
    maxLength: 6,
  },
  {
    label: CONTRATOR_ADD_LABELS.CITY,
    type: "text",
    name: "contractor-city",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: CONTRATOR_ADD_LABELS.EMAIL,
    type: "text",
    name: "contractor-email",
    value: "",
    showName: true,
  },
  {
    label: CONTRATOR_ADD_LABELS.NIP,
    type: "text",
    name: "contractor-nip",
    value: "",
    showName: true,
    validateList: ["IS_NIP_EXIST", "IS_EMPTY", "NIP_VALIDATE"],
    errorList: [],
    maxLength: 13,
  },
];

export const HEADER_PROPS: IHeaderProps = {
  title: CONTRATOR_ADD_LABELS.HEADER_TITLE,
  subtitle: CONTRATOR_ADD_LABELS.HEADER_SUBTITLE,
};

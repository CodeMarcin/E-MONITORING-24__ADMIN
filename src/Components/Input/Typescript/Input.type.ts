import { IInputTextNumberPasswordProps, IInputTextArea } from "./Input.interface";

export type TInputSubCategory = IInputTextNumberPasswordProps | IInputTextArea;
export type TInputType = "text" | "number" | "password" | "textarea";

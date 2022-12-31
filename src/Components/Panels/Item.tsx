/* eslint-disable react-hooks/rules-of-hooks */
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";

import { useCreateItemValue } from "../../Hooks/useCreateItemValue";

import { SVGDeleteIcon } from "../../Utilities/SVG";

import { ITEM_LABELS } from "./Panels.labels";

import styles from "./Panels.module.css";

interface IItemProps {
  index: number;
  itemsCount: number;
  invoiceData: IInputProps[];
  changeValueCallback: (e: React.FormEvent<HTMLInputElement>, stateSubName: "items", index?: number) => void;
  selectedStandard: string;
  dataForSelect: ISelect;
  changeSelectValueCallback: (e: React.FormEvent<HTMLSelectElement>, index?: number) => void;
  deleteItemCallback: (e: React.FormEvent<HTMLDivElement>) => void;
}

export const Item = ({
  index,
  itemsCount,
  invoiceData,
  changeValueCallback,
  selectedStandard,
  dataForSelect,
  changeSelectValueCallback,
  deleteItemCallback,
}: IItemProps) => {
  const price = invoiceData.find((el) => el.name === "price")!.value;
  const quantity = invoiceData.find((el) => el.name === "quantity")!.value;

  return (
    <div className={styles["item"]}>
      <div className={styles["item__ordinal-number"]}>
        <span>{ITEM_LABELS.ITEM_ORDINAL_NUMBER}</span>
        <span> {index + 1}</span>
      </div>
      <Select items={dataForSelect} selected={selectedStandard} onChangeCallback={changeSelectValueCallback} />
      {invoiceData.map((el) => (
        <Input items={el} callbacks={{ onChangeCallback: (e) => changeValueCallback(e, "items", index) }} key={el.name} />
      ))}
      <div className={styles["item__bottom"]}>
        <div className={styles["bottom__value"]}>
          <span>{ITEM_LABELS.ITEM_VALUE}:</span>
          <span>{parseFloat(price) && parseFloat(quantity) ? useCreateItemValue(parseFloat(price), parseFloat(quantity)) : ""}</span>
        </div>

        {itemsCount > 1 && (
          <div className={styles["bottom__delete-icon"]} onClick={(e) => deleteItemCallback(e)} data-id={index}>
            <SVGDeleteIcon dataId={index}/>
          </div>
        )}
      </div>
    </div>
  );
};

import { Select } from "../Select/Select";
import { Input } from "../Input/Input";

import { SVGLoader } from "../../Utilities/SVG";

import { PAYMENT_SETTINGS_LABELS } from "./Panels.labels";

import styles from "./Panels.module.css";

export const PaymentSettings = (props: {
  items: ISelect;
  onChangeCallback: (e: React.FormEvent<HTMLSelectElement>) => void;
  loading: boolean;
  selected: string;
  invoiceData: IInputProps[];
  changeValueCallback: (e: React.FormEvent<HTMLInputElement>, stateSubName: "paymentSettings") => void;
  paymantDate: string;
}) => {
  const { items, loading, selected, onChangeCallback, invoiceData, changeValueCallback, paymantDate } = props;
  if (loading) return <SVGLoader />;
  return (
    <>
      <Select items={items} selected={selected} onChangeCallback={onChangeCallback} />
      {invoiceData.map((el) => (
        <Input
          items={el}
          callbacks={{
            onChangeCallback: (e) => {
              changeValueCallback(e, "paymentSettings");
            },
          }}
          key={el.name}
        />
      ))}
      {selected === "transfer" && (
        <div className={styles["date-of-payment"]}>
          <span>{PAYMENT_SETTINGS_LABELS.SETTINGS_PAYMENT_DATE_OF_PAYMENT}:</span> <span>{paymantDate}</span>
        </div>
      )}
    </>
  );
};

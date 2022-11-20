import { InputTextNumberPassword } from "./InputTextNumberPassword";

import styles from "./Input.module.css";

export const Input = (props: { items: IInputProps; callbacks: IInputCallbacks }) => {
  const { items, callbacks } = props;
  const { label, type, showName, errorList } = items;
  return (
    <label className={styles["label"]}>
      {showName && `${label}:`}
      {type !== "textarea" && <InputTextNumberPassword items={items} callbacks={callbacks} />}
      {errorList && (
        <div className={styles["input-error"]}>
          {errorList.map((el, index) => (
            <p className={styles["input-error__text"]} key={index}>
              {el}
            </p>
          ))}
        </div>
      )}
    </label>
  );
};

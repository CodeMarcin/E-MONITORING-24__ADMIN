import { InputTextNumberPassword } from "./InputTextNumberPassword";

import styles from "./Input.module.css";
import { InputCheckbox } from "./InputCheckbox";

export const Input = (props: { items: IInputProps; callbacks: IInputCallbacks }) => {
  const { items, callbacks } = props;
  const { type, errorList } = items;
  return (
    <label className={styles["label"]}>
      {(type === "text" || type === "password" || type === "number") && <InputTextNumberPassword items={items} callbacks={callbacks} />}
      {type === "checkbox" && <InputCheckbox items={items} callbacks={callbacks} />}
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

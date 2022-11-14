import { InputTextNumberPassword } from "./InputTextNumberPassword";

import { TInputSubCategory } from "./Typescript/Input.type";

import styles from "./Input.module.css";

export const Input = ({ props }: TInputSubCategory) => {
  const { type, errorList } = props;

  return (
    <label className={styles["label"]}>
      {type !== "textarea" && <InputTextNumberPassword props={props} />}
      {errorList && (
        <div className={styles["input-error"]}>
          {errorList.map((el) => (
            <p className={styles['input-error__text']}>{el}</p>
          ))}
        </div>
      )}
    </label>
  );
};

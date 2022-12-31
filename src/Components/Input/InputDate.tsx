import styles from "./Input.module.css";

export const InputDate = (props: { items: IInputProps; callbacks: IInputCallbacks }) => {
  const { items, callbacks } = props;
  const { type, label, name, showName, value } = items;
  const { onChangeCallback } = callbacks;
  return (
    <>
      {showName && `${label}:`}
      <input
        className={styles["inputTextNumberPassword"]}
        type={type}
        name={name}
        value={value}
        onChange={(e: React.FormEvent<HTMLInputElement>) => onChangeCallback(e)}
      />
    </>
  );
};

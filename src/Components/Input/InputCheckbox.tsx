import styles from "./Input.module.css";

export const InputCheckbox = (props: { items: IInputProps; callbacks: IInputCallbacks }) => {
  const { items, callbacks } = props;
  const { type, label, name, value } = items;
  const { onChangeCallback } = callbacks;
  return (
    <div className={styles["inputCheckbox"]}>
      <input type={type} name={name} onChange={onChangeCallback} checked={JSON.parse(value)} />
      {label}
    </div>
  );
};

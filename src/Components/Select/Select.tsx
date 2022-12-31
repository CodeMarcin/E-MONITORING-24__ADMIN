import { SELECT_LABELS } from "./Select.labels";

import styles from "./Styles.module.css";

interface ISelectProps {
  items: ISelect;
  onChangeCallback: (e: React.FormEvent<HTMLSelectElement>, index?: number) => void;
  selected: string;
}

export const Select = ({ items, onChangeCallback, selected }: ISelectProps) => {
  const { name, values } = items;

  return (
    <select name={name} defaultValue={selected === "" ? "default" : selected} onChange={onChangeCallback}>
      <option hidden disabled value="default">
        {SELECT_LABELS.SELECT_CONTRACTOR}
      </option>
      {values.map((el) => (
        <option value={el.value} key={el.value}>
          {el.label}
        </option>
      ))}
    </select>
  );
};

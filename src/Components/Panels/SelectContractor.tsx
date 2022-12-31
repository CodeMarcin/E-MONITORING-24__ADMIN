import { Select } from "../Select/Select";
import { Input } from "../Input/Input";

import { SVGLoader } from "../../Utilities/SVG";

export const SelectContractor = (props: {
  items: ISelect;
  onChangeCallback: (e: React.FormEvent<HTMLSelectElement>) => void;
  loading: boolean;
  selected: string;
  invoiceData: IInputProps[];
  changeValueCallback: (e: React.FormEvent<HTMLInputElement>, stateSubName: "contractor") => void;
}) => {
  const { items, loading, selected, onChangeCallback, invoiceData, changeValueCallback } = props;
  if (loading) return <SVGLoader />;

  return (
    <>
      <Select items={items} selected={selected} onChangeCallback={onChangeCallback} />
      {invoiceData.map((el) => (
        <Input
          items={el}
          callbacks={{
            onChangeCallback: (e) => {
              changeValueCallback(e, "contractor");
            },
          }}
          key={el.name}
        />
      ))}
    </>
  );
};

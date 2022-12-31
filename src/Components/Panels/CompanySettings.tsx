import { Input } from "../Input/Input";

import { SVGLoader } from "../../Utilities/SVG";

export const CompanySettings = (props: {
  loading: boolean;
  invoiceData: IInputProps[];
  changeValueCallback: (e: React.FormEvent<HTMLInputElement>, stateSubName: "company") => void;
}) => {
  const { loading, invoiceData, changeValueCallback } = props;
  if (loading) return <SVGLoader />;

  return (
    <>
      {invoiceData.map((el) => (
        <Input
          items={el}
          callbacks={{
            onChangeCallback: (e) => {
              changeValueCallback(e, "company");
            },
          }}
          key={el.name}
        />
      ))}
    </>
  );
};

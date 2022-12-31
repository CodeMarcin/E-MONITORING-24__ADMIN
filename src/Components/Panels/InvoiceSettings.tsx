import { Input } from "../Input/Input";

import { SVGLoader } from "../../Utilities/SVG";

export const InvoiceSettings = (props: {
  loading: boolean;
  invoiceData: IInputProps[];
  changeValueCallback: (e: React.FormEvent<HTMLInputElement>, stateSubName: "invoiceSettings") => void;
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
              changeValueCallback(e, "invoiceSettings");
            },
          }}
          key={el.name}
        />
      ))}
    </>
  );
};

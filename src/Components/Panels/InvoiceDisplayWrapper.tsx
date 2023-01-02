import Frame from "react-frame-component";

import { InvoiceDisplay } from "./InvoiceDisplay";

import styles from "./Panels.module.css";

export const InvoiceDisplayWrapper = (props: { invoiceData: IInvoiceAdd; dateOfPayment: Date }) => {
  const { invoiceData, dateOfPayment } = props;
  return (
    <>
      <div className={styles["invoice-display-wrapper"]}>
        <InvoiceDisplay invoiceData={invoiceData} dateOfPayment={dateOfPayment} />
      </div>

      <div className={styles["invoice-display-wrapper--mobile"]}>
        <InvoiceDisplay invoiceData={invoiceData} dateOfPayment={dateOfPayment} />
      </div>
    </>
  );
};

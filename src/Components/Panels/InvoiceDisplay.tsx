/* eslint-disable react-hooks/rules-of-hooks */
import { useStyles } from "../../Hooks/useStyles";

import { useCreateCalendarFormatDate } from "../../Hooks/useCreateCalendarFormatDate";
import { useCreateTotalValue } from "../../Hooks/useCreateTotalValue";
import { usePriceToWords } from "../../Hooks/usePriceToWords";
import { useFirstLetterUppercase } from "../../Hooks/useFirstLetterToUpperCase";

import { DISPLAY_LABELS } from "./Panels.labels";

import styles from "./Panels.module.css";

import mainLogo from "../../Assets/Images/logo.png";

export const InvoiceDisplay = (props: { invoiceData: IInvoiceAdd; dateOfPayment: Date }) => {
  const { invoiceData, dateOfPayment } = props;

  console.log(invoiceData, "INVOICE DATA");

  const getPaymantMethod = () => {
    return invoiceData.paymentSettings.length ? DISPLAY_LABELS.DISPLAY_TRANSFER : DISPLAY_LABELS.DISPLAY_CASH;
  };

  const getItemStandard = (standard: string) => {
    return standard === "piece" ? DISPLAY_LABELS.DISPLAY_STANDARD_PIECE : DISPLAY_LABELS.DISPLAY_STANDARD_METER;
  };

  return (
    <div className={styles["invoice-render"]}>
      <div className={styles["invoice-pdf"]}>
        <div className={styles["invoice-pdf__top"]}>
          <div className={styles["invoice-pdf__top-logo"]}>
            <img className={styles["logo-image"]} src={mainLogo} />
            <span className={styles["logo-text"]}>E-MONITORING-24</span>
          </div>
          <div className={styles["invoice-pdf__top-text-section"]}>
            <div className={useStyles(styles["top-text-section__section"], styles["top-text-section__section--border-bottom"])}>
              <div className={styles["top-text-section__section-sub"]}>
                <div className={styles["section-sub-column"]}>
                  <span className="text--normal text--weight-800">{DISPLAY_LABELS.DISPLAY_SELLER}</span>
                </div>
                <div className={styles["section-sub-column"]}>
                  <div className={styles["row"]}>
                    <span className="text--normal text--weight-700">{invoiceData.company[0].value}</span>
                  </div>
                  <div className={styles["row"]}>
                    <span className="text--normal text--weight-600">{invoiceData.company[1].value}</span>
                  </div>
                  <div className={styles["row"]}>
                    <span className="text--normal text--weight-600">
                      {invoiceData.company[2].value} {invoiceData.company[3].value}
                    </span>
                  </div>
                  <div className={styles["row"]}>
                    <div>
                      <span className="text--normal text--weight-700">{DISPLAY_LABELS.DISPLAY_NIP}: </span>
                      <span className="text--normal text--weight-600">{invoiceData.company[5].value}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["top-text-section__section-sub"]}>
                <div className={styles["section-sub-column"]}>
                  <span className="text--extra-large text--weight-800">{DISPLAY_LABELS.DISPLAY_INVOICE}</span>
                  <span className="text--normal text--weight-600">
                    {DISPLAY_LABELS.DISPLAY_NUMBER}: {invoiceData.invoiceSettings[1].value}/{invoiceData.invoiceSettings[2].value}r
                  </span>
                </div>
                <div className={styles["section-sub-column"]}>
                  <div className={useStyles(styles["row"], styles["row--border"])}>
                    <span className="text--normal text--weight-700">{DISPLAY_LABELS.DISPLAY_DATE_OF_ISSUE}:</span>
                    <span className="text--normal text--weight-500">{invoiceData.invoiceSettings[0].value}</span>
                  </div>
                  <div className={useStyles(styles["row"], styles["row--border"])}>
                    <span className="text--normal text--weight-700">{DISPLAY_LABELS.DISPLAY_PLACE_OF_ISSUE}:</span>
                    <span className="text--normal text--weight-500">{invoiceData.invoiceSettings[3].value}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={useStyles(styles["top-text-section__section"], styles["top-text-section__section--border-bottom"])}>
              <div className={styles["top-text-section__section-sub"]}>
                <div className={styles["section-sub-column"]}>
                  <span className="text--normal text--weight-800">{DISPLAY_LABELS.DISPLAY_BUYER}</span>
                </div>
                <div className={styles["section-sub-column"]}>
                  <div className={styles["row"]}>
                    <span className="text--normal text--weight-700">{invoiceData.contractor[0].value}</span>
                  </div>
                  <div className={styles["row"]}>
                    <span className="text--normal text--weight-600">{invoiceData.contractor[1].value}</span>
                  </div>
                  <div className={styles["row"]}>
                    <span className="text--normal text--weight-600">
                      {invoiceData.contractor[2].value} {invoiceData.contractor[3].value}
                    </span>
                  </div>
                  <div className={styles["row"]}>
                    <div>
                      <span className="text--normal text--weight-700">{DISPLAY_LABELS.DISPLAY_NIP}: </span>
                      <span className="text--normal text--weight-600">{invoiceData.contractor[5].value}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={useStyles(
                  styles["top-text-section__section-sub"],
                  getPaymantMethod() !== DISPLAY_LABELS.DISPLAY_TRANSFER ? styles["top-text-section__section-sub--flex-start"] : ""
                )}
              >
                <div className={styles["section-sub-column"]}>
                  <span className="text--normal text--weight-800">{DISPLAY_LABELS.DISPLAY_PAYMENT}</span>
                </div>
                <div className={styles["section-sub-column"]}>
                  <div className={styles["row"]}>
                    <span className="text--normal text--weight-700">{DISPLAY_LABELS.DISPLAY_PAYMENT_METHOD}:</span>
                    <span className="text--normal text--weight-500">{getPaymantMethod()}</span>
                  </div>
                  {getPaymantMethod() === DISPLAY_LABELS.DISPLAY_TRANSFER && (
                    <>
                      <div className={styles["row"]}>
                        <span className="text--normal text--weight-700">{DISPLAY_LABELS.DISPLAY_DATE_OF_PAYMENT}:</span>
                        <span className="text--normal text--weight-500">
                          {invoiceData.paymentSettings[0].value} {DISPLAY_LABELS.DISPLAY_DAYS} ({useCreateCalendarFormatDate(dateOfPayment)})
                        </span>
                      </div>
                      <div className={styles["row"]}>
                        <span className="text--normal text--weight-700">{DISPLAY_LABELS.DISPLAY_ACCOUNT_NUMBER}:</span>
                        <span className="text--normal text--weight-500">{invoiceData.paymentSettings[1].value}</span>
                      </div>
                      <div className={styles["row"]}>
                        <span className="text--normal text--weight-700">{DISPLAY_LABELS.DISPLAY_BANK_NAME}:</span>
                        <span className="text--normal text--weight-500">{invoiceData.paymentSettings[2].value}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <table className={styles["items-table"]}>
          <thead className={styles["items-thead"]}>
            <tr>
              <th className={styles["items-th"]}>{DISPLAY_LABELS.DISPLAY_ORDINAL_NUMBER}</th>
              <th className={styles["items-th"]}>{DISPLAY_LABELS.DISPLAY_NAME}</th>
              <th className={styles["items-th"]}>{DISPLAY_LABELS.DISPLAY_STANDARD}</th>
              <th className={styles["items-th"]}>{DISPLAY_LABELS.DISPLAY_QUANTITY}</th>
              <th className={styles["items-th"]}>{DISPLAY_LABELS.DISPLAY_PRICE}</th>
              <th className={styles["items-th"]}>{DISPLAY_LABELS.DISPLAY_VALUE}</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((el, index) => (
              <tr className={styles["items-tr"]} key={index}>
                <td className={useStyles(styles["items-td"], styles["items-td--ion"])}>{index + 1}</td>
                <td className={useStyles(styles["items-td"], styles["items-td--name"])}>{el.item[0].value}</td>
                <td className={styles["items-td"]}>{getItemStandard(el.standard)}</td>
                <td className={styles["items-td"]}>{el.item[1].value}</td>
                <td className={styles["items-td"]}>{useCreateTotalValue(parseFloat(el.item[2].value))}</td>
                <td className={styles["items-td"]}>{useCreateTotalValue(el.totalPrice)}</td>
              </tr>
            ))}

            <tr>
              <td colSpan={4}></td>
              <td className={useStyles(styles["items-td"], styles["items-td--total-word"], "text--weight-800")}>{DISPLAY_LABELS.DISPLAY_TOTAL_VALUE}:</td>
              <td className={useStyles(styles["items-td"], styles["items-td--total-price"], "text--weight-600")}>{useCreateTotalValue(invoiceData.totalValue)}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles["total-price"]}>
          <span className={"text--weight-700"}>{DISPLAY_LABELS.DISPLAY_AMOUNT_IN_WORDS}:&nbsp; </span>
          <span className="text--weight-600">{useFirstLetterUppercase(usePriceToWords(invoiceData.totalValue).toLocaleLowerCase())}</span>
        </div>
      </div>
    </div>
  );
};

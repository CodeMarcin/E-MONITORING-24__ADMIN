/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useCallback } from "react";

import { Header } from "../../../Components/Header/Header";
import { Loader } from "../../../Components/Loader/Loader";
import { Button } from "../../../Components/Button/Button";
import { BottomPanel } from "../../../Components/BottomPanel/BottomPanel";

import { SelectContractor } from "../../../Components/Panels/SelectContractor";
import { CompanySettings } from "../../../Components/Panels/CompanySettings";
import { InvoiceSettings } from "../../../Components/Panels/InvoiceSettings";
import { PaymentSettings } from "../../../Components/Panels/PaymentSettings";
import { Item } from "../../../Components/Panels/Item";

import { useStyles } from "../../../Hooks/useStyles";
import { useFormatNIP } from "../../../Hooks/useFormatNIP";
import { useFormatZipCode } from "../../../Hooks/useFormatZipCode";
import { useFromatAccountNumber } from "../../../Hooks/useFormatAccountNumber";
import { useValidateInputs } from "../../../Hooks/useValidateInput";
import { useCreateCalendarFormatDate } from "../../../Hooks/useCreateCalendarFormatDate";
import { useCreateCalendarPaymentDate } from "../../../Hooks/useCreateCalendarPaymentDate";

import { getAllContractorsAPI } from "../../../Api/Contractors";
import { getCompanyAPI, getInvoiceSettingsAPI, getPaymentSettingsAPI } from "../../../Api/Company";

import { cloneDeep } from "lodash";

import { HEADER_INVOICE_ADD_PROPS, DEFAUL_INVOICE_DATA, DEFAULT_SETTINGS } from "./Objects";
import {
  GLOBAL_OBJECT_CONTRACTOR,
  GLOBAL_OBJECT_COMPANY,
  GLOBAL_OBJECT_INVOICE_SETTINGS,
  GLOBAL_OBJECT_PAYMENT_SETTINGS,
  GLOBAL_OBJECT_ITEMS,
} from "../../../GlobalObjects/GlobalObjects";

import { INVOICE_ADD_LABELS, INVOICE_ADD_BUTTON_ADD_ITEM_LABELS } from "./InvoiceAdd.labels";

import styles from "./InvoiceAdd.module.css";

const DEFAULT_CONTRACTOR_OBJECT: IInputProps[] = GLOBAL_OBJECT_CONTRACTOR.map((el) => {
  if (el.name === "nip") return { ...el, validateList: ["IS_EMPTY", "NIP_VALIDATE"] };
  return { ...el };
});

const DEFAULT_COMPANY_OBJECT: IInputProps[] = GLOBAL_OBJECT_COMPANY.map((el) => {
  if (el.name === "nip") return { ...el, validateList: ["IS_EMPTY", "NIP_VALIDATE"] };
  return { ...el };
});

type stateSubName = "contractor" | "company" | "invoiceSettings" | "paymentSettings" | "items";

export const InvoiceAdd = () => {
  const [step, setStep] = useState<number>(1);
  const [apiDataLoad, setApiDataLoad] = useState(false);
  const [subApiDataLoad, setSubApiDataLoad] = useState(false);
  const [dateOfPayment, setDateOfPayment] = useState<Date>();
  const [invoiceData, setInvoiceData] = useState<IInvoiceAdd>(DEFAUL_INVOICE_DATA);
  const [selectedData, setSelectedData] = useState<IInvoiceAddSettings>(DEFAULT_SETTINGS);
  const [loaderText, setLoaderText] = useState<TLoaderType>("LOADING_DATA");

  const ADD_ITEM_BUTTON: IButtonProps = {
    type: "SECOND",
    value: INVOICE_ADD_BUTTON_ADD_ITEM_LABELS.ADD,
    width: "FULL",
    callbacks: {
      onClickCallback: () => addItem(),
    },
  };

  const changeValue = (e: React.FormEvent<HTMLInputElement>, stateSubName: stateSubName, index?: number) => {
    const targetValue = (e.target as HTMLInputElement).value;
    const targetName = (e.target as HTMLInputElement).name;
    if (invoiceData) {
      let newValue: string;
      if (stateSubName !== "items") {
        const itemIndexToChange = invoiceData[stateSubName].findIndex((el) => el.name === targetName);
        if (targetName === "nip" && invoiceData[stateSubName][itemIndexToChange].value) {
          newValue = useFormatNIP(targetValue, invoiceData[stateSubName][itemIndexToChange].value.length);
        }
        if (targetName === "zipcode" && invoiceData[stateSubName][itemIndexToChange].value) {
          newValue = useFormatZipCode(targetValue, invoiceData[stateSubName][itemIndexToChange].value.length);
        }
        if (targetName === "accountNumber" && invoiceData[stateSubName][itemIndexToChange].value) {
          newValue = useFromatAccountNumber(targetValue, invoiceData[stateSubName][itemIndexToChange].value.length);
        }

        setInvoiceData((prevState) => ({
          ...prevState,
          [stateSubName]: prevState?.[stateSubName].map((el) => {
            if (el.name === targetName) return { ...el, value: newValue ?? targetValue };
            return { ...el };
          }),
        }));
      } else if (stateSubName === "items") {
        if (targetName === "quantity" || targetName === "price") {
          if (parseInt(targetValue) < 0) newValue = "1";
        }

        setInvoiceData((prevState) => ({
          ...prevState,
          items: prevState.items.map((el, idx) => {
            if (idx === index) {
              return {
                ...el,
                item: [
                  ...prevState.items[idx].item.map((item) => {
                    if (item.name === targetName) return { ...item, value: newValue ?? targetValue };
                    return { ...item };
                  }),
                ],
              };
            }
            return { ...el };
          }),
        }));

        console.log(GLOBAL_OBJECT_ITEMS[0].errorList === invoiceData.items[0].item[0].errorList, " FIRST");
      }
    }
    console.log(invoiceData, "idata");
  };

  const checkValues = async (stateSubName: stateSubName) => {
    try {
      setLoaderText("CHECKING_DATA");
      setApiDataLoad(true);
      if (stateSubName !== "items") {
        if (invoiceData?.[stateSubName]) {
          await Promise.all(
            invoiceData?.[stateSubName].map(async (el) => {
              if (el.validateList) await useValidateInputs(el);
              return el;
            })
          );

          const checkResult = !invoiceData[stateSubName].filter((el) => el.errorList).some((el) => !!el.errorList?.length);

          return checkResult;
        }
      } else if (stateSubName === "items") {
        console.log(invoiceData.items);
        if (invoiceData?.items) {
          const items = useCloneArray(invoiceData.items);

          const itemsAfterCheck = await Promise.all(
            items.map(async (el: IItem) => {
              return await Promise.all(
                el.item.map(async (item) => {
                  if (item.validateList) await useValidateInputs(item);
                  return item;
                })
              );
            })
          );

          const checkResultArray = [...invoiceData.items.map((el) => !el.item.some((item) => !!item.errorList?.length))];
          const checkResult = checkResultArray.every((el) => el);
          return checkResult;
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setApiDataLoad(false);
    }
  };

  const changeStep = (site: "NEXT" | "PREVIOUS") => {
    if (site === "NEXT") {
      setStep((prevState) => prevState + 1);
    } else if (site === "PREVIOUS") {
      setStep((prevState) => prevState - 1);
    }
  };

  const getTitle = () => {
    let stepTitle = `${INVOICE_ADD_LABELS.STEP} ${step}/5 - `;
    let placeTitle: string;
    if (step === 1) placeTitle = INVOICE_ADD_LABELS.SELECT_CONTRACTOR;
    else if (step === 2) placeTitle = INVOICE_ADD_LABELS.SETTINGS_COMPANY;
    else if (step === 3) placeTitle = INVOICE_ADD_LABELS.SETTINGS_INVOICE;
    else if (step === 4) placeTitle = INVOICE_ADD_LABELS.SETTINGS_PAYMANT;
    else if (step === 5) placeTitle = INVOICE_ADD_LABELS.SETTINGS_SERVICES_GOODS;
    else placeTitle = "";
    return `${stepTitle} ${placeTitle}`;
  };

  const getBottomPanelButtons = (): IButtonProps[] => {
    const buttonNext: IButtonProps = {
      type: "BASIC",
      width: "FLEX",
      value: INVOICE_ADD_LABELS.NEXT,
      callbacks: {
        onClickCallback: async () => {
          const stateSubName = step === 1 ? "contractor" : step === 2 ? "company" : step === 3 ? "invoiceSettings" : step === 4 ? "paymentSettings" : "items";
          if (await checkValues(stateSubName)) changeStep("NEXT");
        },
      },
    };

    const buttonPrevious: IButtonProps = {
      type: "SECOND",
      width: "FLEX",
      value: INVOICE_ADD_LABELS.BACK,
      callbacks: {
        onClickCallback: () => {
          changeStep("PREVIOUS");
        },
      },
    };

    if (step === 1) return [buttonNext];
    else if (step >= 2 || step <= 4) return [buttonPrevious, buttonNext];
    else return [];
  };

  const addItem = () => {
    console.log(GLOBAL_OBJECT_ITEMS, "ITEM I NADD ITEM");
    // setInvoiceData((prevState) => ({ ...prevState, items: [...prevState.items, { standard: "piece", item: [...GLOBAL_OBJECT_ITEMS.map((el) => ({ ...el }))] }] }));
    setInvoiceData((prevState) => ({ ...prevState, items: [...prevState.items, { standard: "piece", item: cloneDeep(GLOBAL_OBJECT_ITEMS) }] }));
  };

  const removeItem = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    const parentNode = target.parentNode!;
    const indexToRemove = parseInt(target.dataset.id!) || parseInt((parentNode as HTMLElement).dataset.id!);

    setInvoiceData((prevState) => ({ ...prevState, items: [...prevState.items.filter((el, index) => index !== indexToRemove)] }));
  };

  const createSelectContractorData = useCallback(async () => {
    try {
      setSubApiDataLoad(true);

      if (!selectedData.contractors.length) {
        const contractorsDataFromApi = (await getAllContractorsAPI("createdAt", "desc", 0)).data;
        const dataForSelectContractor: ISelect = {
          name: "invoiceAdd",
          values: [...contractorsDataFromApi.map((el: IContractorAPI) => ({ value: el._id, label: el.name }))],
        };

        setSelectedData((prevState) => ({
          ...prevState,
          dataForSelectContractor: { ...dataForSelectContractor },
          contractors: [...contractorsDataFromApi],
        }));
      }

      setInvoiceData((prevState) => ({ ...prevState, contractor: [...(!prevState.contractor.length ? DEFAULT_CONTRACTOR_OBJECT : prevState.contractor)] }));

      setSubApiDataLoad(false);
    } catch (error) {
      console.error(error);
    }
  }, [selectedData]);

  const handleChangeSelectContractor = (e: React.FormEvent<HTMLSelectElement>) => {
    const targetValue = (e.target as HTMLSelectElement).value;
    const selectedContractorData: IContractorAPI = Object.assign({}, ...selectedData.contractors.filter((el) => el._id === targetValue));
    setSelectedData((prevState) => ({ ...prevState, selectedContractor: selectedContractorData._id ?? "" }));

    setInvoiceData((prevState) => ({
      ...prevState,
      contractor: [...DEFAULT_CONTRACTOR_OBJECT.map((el) => ({ ...el, value: selectedContractorData[el.name as keyof IContractorAPI] ?? "" }))],
    }));
  };

  const createCompanyData = useCallback(async () => {
    try {
      if (!invoiceData.company.length) {
        setSubApiDataLoad(true);
        const companyDataFromAPI = (await getCompanyAPI()).data.company;

        setInvoiceData((prevState) => ({
          ...prevState,
          company: [...DEFAULT_COMPANY_OBJECT.map((el) => ({ ...el, value: companyDataFromAPI[el.name as keyof ICompanyAPI] ?? "" }))],
        }));
        setSubApiDataLoad(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [invoiceData.company]);

  const createInvoiceSettingsData = useCallback(async () => {
    try {
      if (!invoiceData.invoiceSettings.length) {
        setSubApiDataLoad(true);
        const invoiceSettingsFromAPI = (await getInvoiceSettingsAPI()).data.site;

        setInvoiceData((prevState) => ({
          ...prevState,
          invoiceSettings: [
            ...GLOBAL_OBJECT_INVOICE_SETTINGS.map((el) => {
              if (el.name === "dateOfIssue") return { ...el, value: useCreateCalendarFormatDate(new Date()) };
              else if (el.name === "lastInvoiceNumber") return { ...el, value: invoiceSettingsFromAPI["lastInvoiceNumber"] + 1 };
              return { ...el, value: invoiceSettingsFromAPI[el.name as keyof IInvoiceSettingsAPI] ?? "" };
            }),
          ],
        }));

        setSubApiDataLoad(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [invoiceData.invoiceSettings]);

  const createPaymentSettingsData = useCallback(async () => {
    try {
      if (!invoiceData.paymentSettings.length && !selectedData.paymentSettings.bankName && !selectedData.paymentSettings.accountNumber) {
        setSubApiDataLoad(true);
        const paymentSettingsFromAPI = (await getPaymentSettingsAPI()).data.company;
        const dataForSelectPaymentMethod: ISelect = {
          name: "paymentMethod",
          values: [
            { label: INVOICE_ADD_LABELS.PAYMENT_METHOD_TRANSFERS, value: "transfer" },
            { label: INVOICE_ADD_LABELS.PAYMENT_METHOD_CASH, value: "cash" },
          ],
        };
        setSelectedData((prevState) => ({ ...prevState, paymentSettings: { ...paymentSettingsFromAPI }, dataForSelectPayment: { ...dataForSelectPaymentMethod } }));

        setInvoiceData((prevState) => ({
          ...prevState,
          paymentSettings: [
            ...GLOBAL_OBJECT_PAYMENT_SETTINGS.map((el) => {
              if (el.name === "daysOfPayment") return { ...el, value: "14" };
              return { ...el, value: paymentSettingsFromAPI[el.name as keyof IPaymentAPI] ?? "" };
            }),
          ],
        }));

        setSubApiDataLoad(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [invoiceData.paymentSettings.length, selectedData.paymentSettings.bankName, selectedData.paymentSettings.accountNumber]);

  const handleChangePaymentMethod = (e: React.FormEvent<HTMLSelectElement>) => {
    const targetValue = (e.target as HTMLSelectElement).value;

    setSelectedData((prevState) => ({ ...prevState, selectedPaymentMethod: targetValue }));

    setInvoiceData((prevState) => ({
      ...prevState,
      paymentSettings:
        targetValue === "transfer"
          ? [
              ...GLOBAL_OBJECT_PAYMENT_SETTINGS.map((el) => {
                if (el.name === "daysOfPayment") return { ...el, value: "14" };
                return { ...el, value: selectedData.paymentSettings[el.name as keyof IPaymentAPI] ?? "" };
              }),
            ]
          : [],
    }));
  };

  const createItemsData = () => {
    console.log("odpalilem create items data");
    if (!invoiceData.items.length) {
      const dataForSelectItem: ISelect = {
        name: "standard",
        values: [
          { label: INVOICE_ADD_LABELS.ITEMS_STANDARD_METERS, value: "meter" },
          { label: INVOICE_ADD_LABELS.ITEMS_STANDARD_PIECE, value: "piece" },
        ],
      };
      setSelectedData((prevState) => ({ ...prevState, dataForSelectItems: { ...dataForSelectItem } }));

      // setInvoiceData((prevState) => ({ ...prevState, items: [{ standard: "piece", item: [...GLOBAL_OBJECT_ITEMS.map((el) => ({ ...el }))] }] }));
      setInvoiceData((prevState) => ({ ...prevState, items: [{ standard: "piece", item: cloneDeep(GLOBAL_OBJECT_ITEMS) }] }));
    }
  };

  const handleChangeItemsStandard = (e: React.FormEvent<HTMLSelectElement>, index?: number) => {
    const targetValue = (e.target as HTMLSelectElement).value;
    setInvoiceData((prevState) => ({
      ...prevState,
      items: prevState.items.map((el, idx) => {
        if (idx === index) return { ...el, standard: targetValue };
        return { ...el };
      }),
    }));
  };

  useEffect(() => {
    setDateOfPayment(
      useCreateCalendarPaymentDate(
        invoiceData.paymentSettings.find((el) => el.name === "daysOfPayment")?.value ?? "0",
        invoiceData.invoiceSettings.find((el) => el.name === "dateOfIssue")?.value ?? "0"
      )
    );
  }, [invoiceData.paymentSettings, invoiceData.invoiceSettings]);

  useEffect(() => {
    // console.log(selectedData, "SELECTED DATA from use effect");
    // console.log(invoiceData, "INVOICE DATA from use effect");
    if (step === 1) createSelectContractorData();
    else if (step === 2) createCompanyData();
    else if (step === 3) createInvoiceSettingsData();
    else if (step === 4) createPaymentSettingsData();
    else if (step === 5) createItemsData();
  }, [step]);

  return (
    <>
      {apiDataLoad && <Loader type={loaderText} />}
      <BottomPanel buttons={getBottomPanelButtons()} />
      <div className={useStyles("container--full-width", styles["invoice-add"])}>
        <Header items={HEADER_INVOICE_ADD_PROPS} />
        <div className={useStyles("container--main", styles["container"])}>
          <div className={styles["container__step"]}>{getTitle()}</div>
          {step === 1 && invoiceData.contractor && (
            <SelectContractor
              items={selectedData.dataForSelectContractor}
              selected={selectedData.selectedContractor}
              onChangeCallback={handleChangeSelectContractor}
              invoiceData={invoiceData.contractor}
              loading={subApiDataLoad}
              changeValueCallback={changeValue}
            />
          )}
          {step === 2 && invoiceData.company && <CompanySettings invoiceData={invoiceData.company} loading={subApiDataLoad} changeValueCallback={changeValue} />}
          {step === 3 && invoiceData.invoiceSettings && (
            <InvoiceSettings invoiceData={invoiceData.invoiceSettings} loading={subApiDataLoad} changeValueCallback={changeValue} />
          )}
          {step === 4 && invoiceData.paymentSettings && (
            <PaymentSettings
              items={selectedData.dataForSelectPayment}
              selected={selectedData.selectedPaymentMethod}
              onChangeCallback={handleChangePaymentMethod}
              invoiceData={invoiceData.paymentSettings}
              loading={subApiDataLoad}
              changeValueCallback={changeValue}
              paymantDate={useCreateCalendarFormatDate(dateOfPayment ?? new Date())}
            />
          )}
          {step === 5 && invoiceData.items && (
            <>
              {invoiceData.items.map((el, index) => (
                <Item
                  index={index}
                  itemsCount={invoiceData.items.length}
                  invoiceData={el.item}
                  changeValueCallback={changeValue}
                  selectedStandard={el.standard}
                  dataForSelect={selectedData.dataForSelectItems}
                  changeSelectValueCallback={(e) => handleChangeItemsStandard(e, index)}
                  deleteItemCallback={(e) => removeItem(e)}
                  key={index}
                />
              ))}
              <Button items={ADD_ITEM_BUTTON} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../../Components/Header/Header";
import { Loader } from "../../../Components/Loader/Loader";
import { Button } from "../../../Components/Button/Button";
import { BottomPanel } from "../../../Components/BottomPanel/BottomPanel";

import { PopupModal } from "../../../Components/PopupModal/PopupModal";

import { SelectContractor } from "../../../Components/Panels/SelectContractor";
import { CompanySettings } from "../../../Components/Panels/CompanySettings";
import { InvoiceSettings } from "../../../Components/Panels/InvoiceSettings";
import { PaymentSettings } from "../../../Components/Panels/PaymentSettings";
import { Item } from "../../../Components/Panels/Item";
import { InvoiceDisplayWrapper } from "../../../Components/Panels/InvoiceDisplayWrapper";

import { useStyles } from "../../../Hooks/useStyles";
import { useFormatNIP } from "../../../Hooks/useFormatNIP";
import { useFormatZipCode } from "../../../Hooks/useFormatZipCode";
import { useFromatAccountNumber } from "../../../Hooks/useFormatAccountNumber";
import { useValidateInputs } from "../../../Hooks/useValidateInput";
import { useCreateCalendarFormatDate } from "../../../Hooks/useCreateCalendarFormatDate";
import { useCreateCalendarPaymentDate } from "../../../Hooks/useCreateCalendarPaymentDate";
import { useCreateTotalValue } from "../../../Hooks/useCreateTotalValue";

import { getAllContractorsAPI } from "../../../Api/Contractors";
import { getCompanyAPI, getInvoiceSettingsAPI, getPaymentSettingsAPI } from "../../../Api/Company";
import { findInvoiceByInvoiceNumberAndInvoiceYear } from "../../../Api/Invoices";
import { addInvoiceAPI } from "../../../Api/Invoices";

import { cloneDeep, isEqual } from "lodash";

import { HEADER_INVOICE_ADD_PROPS, DEFAUL_INVOICE_DATA, DEFAULT_SETTINGS, DEFAUL_SAME_INVOICE_NUMBER_MODAL } from "./Objects";
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
  const [apiDataLoad, setApiDataLoad] = useState<boolean>(false);
  const [subApiDataLoad, setSubApiDataLoad] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IPopupModalProps>(DEFAUL_SAME_INVOICE_NUMBER_MODAL);
  const [dateOfPayment, setDateOfPayment] = useState<Date>();
  const [invoiceData, setInvoiceData] = useState<IInvoiceAdd>(DEFAUL_INVOICE_DATA);
  const [selectedData, setSelectedData] = useState<IInvoiceAddSettings>(DEFAULT_SETTINGS);
  const [loaderText, setLoaderText] = useState<TLoaderType>("LOADING_DATA");

  const { id: idFromURL } = useParams();

  const navigate = useNavigate();

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
      if (stateSubName !== "items") {
        let newValue: string;
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
        let newValue: string;
        if ((targetName === "quantity" || targetName === "price") && parseInt(targetValue) < 0) newValue = "1";
        if (targetName === "quantity" && (targetValue[targetValue.length - 1] === "." || targetValue[targetValue.length - 1] === ","))
          newValue = `${targetValue.slice(0, -1)}`;
        if (targetName === "price" && targetValue[targetValue.length - 1] === ",") newValue = `${targetValue.slice(0, -1)}.`;
        setInvoiceData((prevState) => ({
          ...prevState,
          items: prevState.items.map((el, idx) => {
            if (idx === index) {
              return {
                ...el,
                totalPrice:
                  targetName === "quantity" || targetName === "price"
                    ? parseFloat(newValue ?? targetValue) *
                      parseFloat(targetName === "quantity" ? el.item.find((el) => el.name === "price")!.value : el.item.find((el) => el.name === "quantity")!.value)
                    : prevState.items[idx].totalPrice,
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
          totalValue: targetName === "quantity" || targetName === "price" ? createTotalValue(targetName, newValue ?? targetValue, index!) : prevState.totalValue,
        }));
      }
    }
  };

  const createTotalValue = (targetName: string, targetValue: string, index: number) => {
    let totalValue: number = 0;

    invoiceData.items
      .filter((el, idx) => index !== idx)
      .forEach((el) => {
        if (el.totalPrice) totalValue += el.totalPrice;
      });

    const secondValue =
      targetName === "quantity"
        ? invoiceData.items[index].item.find((el) => el.name === "price")!.value ?? 0
        : invoiceData.items[index].item.find((el) => el.name === "quantity")!.value ?? 0;

    totalValue += parseFloat(targetValue) * parseFloat(secondValue);

    return totalValue;
  };

  const addTotalValue = () => {
    setInvoiceData((prevState) => ({ ...prevState, totalValue: prevState.totalValue + 1 }));
  };

  const subtractTotalValue = (itemIndexToRemove: number) => {
    setInvoiceData((prevState) => ({ ...prevState, totalValue: prevState.totalValue - prevState.items[itemIndexToRemove].totalPrice }));
  };

  const checkValues = async (stateSubName: stateSubName) => {
    try {
      setLoaderText("CHECKING_DATA");
      setApiDataLoad(true);
      if (stateSubName !== "items") {
        if (invoiceData?.[stateSubName]) {
          const valuesFromInvoiceData = cloneDeep(invoiceData?.[stateSubName]);

          const valuesAfterCheck = await Promise.all(
            valuesFromInvoiceData.map(async (el) => {
              if (el.validateList) await useValidateInputs(el);
              return el;
            })
          );

          setInvoiceData((prevState) => ({
            ...prevState,
            [stateSubName]: cloneDeep(valuesAfterCheck),
          }));

          const checkResult = !valuesAfterCheck.filter((el) => el.errorList).some((el) => !!el.errorList?.length);
          if (
            stateSubName === "invoiceSettings" &&
            (await findInvoiceByInvoiceNumberAndInvoiceYear(invoiceData.invoiceSettings[1].value, invoiceData.invoiceSettings[2].value)).data
          ) {
            const closeModal = () => {
              setModalData((prevState) => ({ ...prevState, show: false }));
            };

            const modalButtons: IButtonProps[] = [
              { type: "SECOND", width: "FLEX", value: INVOICE_ADD_LABELS.BACK, callbacks: { onClickCallback: closeModal } },
              {
                type: "BASIC",
                width: "FLEX",
                value: INVOICE_ADD_LABELS.NEXT,
                callbacks: {
                  onClickCallback: () => {
                    closeModal();
                    setStep((prevState) => prevState + 1);
                  },
                },
              },
            ];

            setModalData((prevState) => ({ ...prevState, show: true, buttons: modalButtons, toggleModalCallback: closeModal }));
            return false;
          }
          return checkResult;
        }
      } else if (stateSubName === "items") {
        if (invoiceData?.items) {
          const items = cloneDeep(invoiceData.items);

          const itemsAfterCheck = await Promise.all(
            items.map(async (el) => {
              return await Promise.all(
                el.item.map(async (item) => {
                  if (item.validateList) await useValidateInputs(item);
                  return item;
                })
              );
            })
          );

          setInvoiceData((prevState) => ({
            ...prevState,
            items: prevState.items.map((el, index) => {
              return {
                ...el,
                item: [...itemsAfterCheck[index]],
              };
            }),
          }));

          const checkResultArray = [...itemsAfterCheck.map((el) => !el.some((item) => !!item.errorList?.length))];
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
      // TO DO Clean Error list on change step to PREVIOUS
    }
  };

  const getTitle = () => {
    let stepTitle = `${INVOICE_ADD_LABELS.STEP} ${step}/6 - `;
    let placeTitle: string;
    if (step === 1) placeTitle = INVOICE_ADD_LABELS.SELECT_CONTRACTOR;
    else if (step === 2) placeTitle = INVOICE_ADD_LABELS.SETTINGS_COMPANY;
    else if (step === 3) placeTitle = INVOICE_ADD_LABELS.SETTINGS_INVOICE;
    else if (step === 4) placeTitle = INVOICE_ADD_LABELS.SETTINGS_PAYMANT;
    else if (step === 5) placeTitle = INVOICE_ADD_LABELS.SETTINGS_SERVICES_GOODS;
    else if (step === 6) placeTitle = INVOICE_ADD_LABELS.SETTINGS_PREVIEW;
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

    const buttonSave: IButtonProps = {
      type: "BASIC",
      width: "FLEX",
      value: INVOICE_ADD_LABELS.SAVE,
      callbacks: {
        onClickCallback: () => {
          saveInvoice();
        },
      },
    };

    if (!subApiDataLoad) {
      if (step === 1) return [buttonNext];
      else if (step >= 2 && step <= 5) return [buttonPrevious, buttonNext];
      return [buttonPrevious, buttonSave];
    }
    return [];
  };

  const addItem = () => {
    setInvoiceData((prevState) => ({ ...prevState, items: [...prevState.items, { standard: "piece", totalPrice: 1, item: cloneDeep(GLOBAL_OBJECT_ITEMS) }] }));
    addTotalValue();
  };

  const removeItem = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    const parentNode = target.parentNode!;
    const indexToRemove = parseInt(target.dataset.id!) || parseInt((parentNode as HTMLElement).dataset.id!);

    subtractTotalValue(indexToRemove);
    setInvoiceData((prevState) => ({ ...prevState, items: [...prevState.items.filter((el, index) => index !== indexToRemove)] }));
  };

  const saveInvoice = async () => {
    const parseData = (): IInvoiceAddDataToSendAPI => {
      return {
        selectedContractorId: selectedData.selectedContractor,
        totalValue: invoiceData.totalValue,
        increasLastInvoiceNumber: selectedData.lastInvoiceNumber + 1 === invoiceData.invoiceSettings[1].value ? true : false,
        company: {
          name: invoiceData.company[0].value,
          address: invoiceData.company[1].value,
          zipcode: invoiceData.company[2].value,
          city: invoiceData.company[3].value,
          email: invoiceData.company[4].value,
          nip: invoiceData.company[5].value,
          phoneNumber: invoiceData.company[6].value,
          siteAddress: invoiceData.company[7].value,
        },
        contractor: {
          name: invoiceData.contractor[0].value,
          address: invoiceData.contractor[1].value,
          zipcode: invoiceData.contractor[2].value,
          city: invoiceData.contractor[3].value,
          email: invoiceData.contractor[4].value,
          nip: invoiceData.contractor[5].value,
        },
        invoiceSettings: {
          dateOfIssue: invoiceData.invoiceSettings[0].value,
          invoiceNumber: invoiceData.invoiceSettings[1].value,
          invoiceYear: invoiceData.invoiceSettings[2].value,
          placeOfIssue: invoiceData.invoiceSettings[3].value,
        },
        paymentSettings: {
          daysOfPayment: invoiceData.paymentSettings[0]?.value ?? "",
          accountNumber: invoiceData.paymentSettings[1]?.value ?? "",
          bankName: invoiceData.paymentSettings[2]?.value ?? "",
          dateOfPayment: useCreateCalendarFormatDate(dateOfPayment!) ?? "",
        },
        items: [
          ...invoiceData.items.map((el) => ({
            name: el.item[0].value,
            quantity: el.item[1].value,
            price: el.item[2].value,
            standard: el.standard,
            totalPrice: el.totalPrice,
          })),
        ],
      };
    };

    const checkIsContractorIsNew = (dataToSend: IInvoiceAddDataToSendAPI) => {
      const selectedContractorData = selectedData.contractors.find((el) => el._id === selectedData.selectedContractor);
      if (selectedContractorData) {
        const cleanContractorData = {
          name: selectedContractorData.name,
          address: selectedContractorData.address,
          zipcode: selectedContractorData.zipcode,
          city: selectedContractorData.city,
          email: selectedContractorData.email,
          nip: selectedContractorData.nip,
        };
        return !isEqual(dataToSend.contractor, cleanContractorData);
      }
      return true;
    };

    try {
      setLoaderText("SAVING");
      setApiDataLoad(true);
      const dataToSend = parseData();
      if (checkIsContractorIsNew(dataToSend)) delete dataToSend.selectedContractorId;
      await addInvoiceAPI(dataToSend);
    } catch (error) {
      console.error(error);
    } finally {
      setApiDataLoad(false);
    }

    navigate("/contractorsAll");
  };

  const createSelectContractorData = useCallback(async () => {
    try {
      setSubApiDataLoad(true);
      let contractorFromIdURL: IContractorAPI | undefined;
      if (!selectedData.contractors.length) {
        const contractorsDataFromApi = (await getAllContractorsAPI("createdAt", "desc", 0)).data;
        const dataForSelectContractor: ISelect = {
          name: "invoiceAdd",
          values: [...contractorsDataFromApi.map((el: IContractorAPI) => ({ value: el._id, label: el.name }))],
        };

        if (idFromURL) {
          contractorFromIdURL = contractorsDataFromApi.find((el) => el._id === idFromURL);
        }

        setSelectedData((prevState) => ({
          ...prevState,
          dataForSelectContractor: { ...dataForSelectContractor },
          contractors: [...contractorsDataFromApi],
          selectedContractor: contractorFromIdURL?._id ?? "",
        }));
      }

      setInvoiceData((prevState) => ({
        ...prevState,
        contractor: [
          ...(!prevState.contractor.length
            ? DEFAULT_CONTRACTOR_OBJECT.map((el) => ({ ...el, value: contractorFromIdURL?.[el.name as keyof IContractorAPI] ?? "" }))
            : prevState.contractor),
        ],
      }));

      setSubApiDataLoad(false);
    } catch (error) {
      console.error(error);
    }
  }, [selectedData, idFromURL]);

  const handleChangeSelectContractor = (e: React.FormEvent<HTMLSelectElement>) => {
    const targetValue = (e.target as HTMLSelectElement).value;
    const selectedContractorData: IContractorAPI = Object.assign({}, ...selectedData.contractors.filter((el) => el._id === targetValue));
    setSelectedData((prevState) => ({ ...prevState, selectedContractor: selectedContractorData._id! }));

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
          company: [...DEFAULT_COMPANY_OBJECT.map((el) => ({ ...el, value: companyDataFromAPI[el.name as keyof ICompanyAPI]! }))],
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

        setSelectedData((prevState) => ({ ...prevState, lastInvoiceNumber: invoiceSettingsFromAPI.lastInvoiceNumber }));

        setInvoiceData((prevState) => ({
          ...prevState,
          invoiceSettings: [
            ...GLOBAL_OBJECT_INVOICE_SETTINGS.map((el) => {
              if (el.name === "dateOfIssue") return { ...el, value: useCreateCalendarFormatDate(new Date()) };
              else if (el.name === "lastInvoiceNumber") return { ...el, name: "invoiceNumber", value: invoiceSettingsFromAPI["lastInvoiceNumber"] + 1 };
              else if (el.name === "lastInvoiceYear") return { ...el, name: "invoiceYear", value: invoiceSettingsFromAPI["lastInvoiceYear"] };
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
                return { ...el, value: selectedData.paymentSettings[el.name as keyof IPaymentAPI]! };
              }),
            ]
          : [],
    }));
  };

  const createItemsData = () => {
    if (!invoiceData.items.length) {
      const dataForSelectItem: ISelect = {
        name: "standard",
        values: [
          { label: INVOICE_ADD_LABELS.ITEMS_STANDARD_METERS, value: "meter" },
          { label: INVOICE_ADD_LABELS.ITEMS_STANDARD_PIECE, value: "piece" },
        ],
      };
      setSelectedData((prevState) => ({ ...prevState, dataForSelectItems: { ...dataForSelectItem } }));

      setInvoiceData((prevState) => ({ ...prevState, items: [{ standard: "piece", totalPrice: 1, item: cloneDeep(GLOBAL_OBJECT_ITEMS) }] }));
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
    if (step === 1) createSelectContractorData();
    else if (step === 2) createCompanyData();
    else if (step === 3) createInvoiceSettingsData();
    else if (step === 4) createPaymentSettingsData();
    else if (step === 5) createItemsData();
  }, [step]);

  return (
    <>
      {apiDataLoad && <Loader type={loaderText} />}
      {modalData.show && <PopupModal items={modalData} />}
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
              <div className={styles["total-value"]}>
                <span>{INVOICE_ADD_LABELS.TOTAL_VALUE}</span> <span>{useCreateTotalValue(invoiceData.totalValue)}</span>
              </div>

              <Button items={ADD_ITEM_BUTTON} />
            </>
          )}
          {step === 6 && invoiceData && <InvoiceDisplayWrapper invoiceData={invoiceData} dateOfPayment={dateOfPayment!} />}
        </div>
      </div>
    </>
  );
};

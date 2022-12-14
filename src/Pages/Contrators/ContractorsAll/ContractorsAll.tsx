import { useState, useEffect, useCallback, Fragment } from "react";

import { Header } from "../../../Components/Header/Header";
import { Accordion } from "../../../Components/Accordion/Accordion";
import { PopupModal } from "../../../Components/PopupModal/PopupModal";
import { Portal } from "../../../Components/Portal/Portal";
import { Loader } from "../../../Components/Loader/Loader";

import { useStyles } from "../../../Hooks/useStyles";

import { getAllContractorsAPI, deleteContractorByIDAPI } from "../../../Api/Contractors";

import { SORT_SETTINGS, HEADER_PROPS } from "./Objects";

import { CONTRATORS_ALL_LABELS } from "./ContractorsAll.labels";

import styles from "./ContractorsAll.module.css";

export const ContractorsAll = () => {
  const [contractorsData, setContractorsData] = useState<IAccordionProps[]>([]);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<IPopupModalProps[]>([]);
  const [sort, setSort] = useState(SORT_SETTINGS);
  const [apiDataLoad, setApiDataLoad] = useState(false);
  const [loaderText, setLoaderText] = useState<TLoaderType>("LOADING_DATA");

  const getContractorsFromAPI = useCallback(async () => {
    try {
      setApiDataLoad(true);

      const contractorsDataFromAPI = await getAllContractorsAPI(sort.sortBy, sort.sortType, sort.limit);

      setContractorsData(() => {
        return contractorsDataFromAPI.data.map((el: IContractorAPI, index: number): IAccordionProps => {
          const leftSection = { leftContent: [el.address, `${el.zipcode} ${el.city}`, el.email], NIP: el.nip };
          const bottomMenu: IAccordionPropsBottomMenu[] = [
            { label: CONTRATORS_ALL_LABELS.BOTTOM_ACCORDION_MENU_ADD_INVOICE, action: `/invoiceAdd/${el._id}` },
            { label: CONTRATORS_ALL_LABELS.BOTTOM_ACCORDION_MENU_EDIT, action: `/contractorEdit/${el._id}` },
            { label: CONTRATORS_ALL_LABELS.BOTTOM_ACCORDION_MENU_INVOICES, action: "wp.pl" },
            {
              label: CONTRATORS_ALL_LABELS.BOTTOM_ACCORDION_MENU_DELETE,
              action: () =>
                setDeleteConfirmModal((prevState) => {
                  return prevState.map((el, elIndex) => {
                    if (elIndex === index) return { ...el, show: true };
                    return el;
                  });
                }),
            },
          ];
          return { id: el._id, title: el.name, leftSection, rightSection: false, bottomMenu };
        });
      });

      setDeleteConfirmModal(() => {
        return contractorsDataFromAPI.data.map((el: IContractorAPI, index: number): IPopupModalProps => {
          const modalButtons: IButtonProps[] = [
            { type: "SECOND", width: "FLEX", value: CONTRATORS_ALL_LABELS.CONFIRM_DELETE_MODAL_BUTTON_CANCEL, callbacks: { onClickCallback: closeDeleteModal } },
            {
              type: "BASIC",
              width: "FLEX",
              value: CONTRATORS_ALL_LABELS.CONFIRM_DELETE_MODAL_BUTTON_CONFIRM,
              callbacks: { onClickCallback: () => el._id && deleteContratorByID(el._id, index) },
            },
          ];
          const checkBox: IInputProps = {
            name: `delete-invoices-${index}`,
            label: CONTRATORS_ALL_LABELS.CONFIRM_DELETE_MODAL_DELETE_ALL_INVOICES_TEXT,
            showName: false,
            type: "checkbox",
            value: "true",
          };

          const handleCheckBox = (index: number) => {
            setDeleteConfirmModal((prevState) =>
              prevState.map((el, idx) => {
                if (idx === index) return { ...el, checkbox: { ...prevState[idx].checkbox!, value: prevState[idx].checkbox!.value === "true" ? "false" : "true" } };
                return { ...el };
              })
            );
          };

          return {
            show: false,
            title: `${CONTRATORS_ALL_LABELS.CONFIRM_DELETE_MODAL_TITLE} ${el.name}?`,
            text: CONTRATORS_ALL_LABELS.CONFIRM_DELETE_MODAL_TEXT,
            checkbox: checkBox,
            buttons: modalButtons,
            toggleModalCallback: closeDeleteModal,
            handleCheckBoxCallback: () => handleCheckBox(index),
          };
        });
      });

      setApiDataLoad(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteContratorByID = async (id: string, index: number) => {
    try {
      const deleteAllInvoices: HTMLInputElement = document.querySelector(`input[name="delete-invoices-${index}"]`)!
      closeDeleteModal();
      setLoaderText("DELETING");
      setApiDataLoad(true);
      await deleteContractorByIDAPI(id, deleteAllInvoices.checked);
      setLoaderText("LOADING_DATA");
      await getContractorsFromAPI();
    } catch (error) {
      console.error(error);
    }
  };

  const closeDeleteModal = () => {
    setDeleteConfirmModal((prevState) =>
      prevState.map((el) => {
        return { ...el, show: false };
      })
    );
  };

  useEffect(() => {
    getContractorsFromAPI();
  }, [getContractorsFromAPI]);

  return (
    <>
      {apiDataLoad && (
        <Portal>
          <Loader type={loaderText} />
        </Portal>
      )}
      <div className={useStyles("container--full-width", styles["contractors-all"])}>
        <Header items={HEADER_PROPS} />
        <div className={useStyles("container--main", styles["container"])}>
          {contractorsData &&
            contractorsData.map((el, index) => {
              return (
                <Fragment key={el.id}>
                  <Accordion items={el} />
                  {deleteConfirmModal[index].show && <PopupModal items={deleteConfirmModal[index]} />}
                </Fragment>
              );
            })}
        </div>
      </div>
    </>
  );
};

import { useState, useEffect, useCallback } from "react";

import { Header } from "../../../Components/Header/Header";
import { Accordion } from "../../../Components/Accordion/Accordion";
import { Portal } from "../../../Components/Portal/Portal";
import { Loader } from "../../../Components/Loader/Loader";

import { useStyles } from "../../../Hooks/useStyles";

import { getAllContractorsAPI } from "../../../Api/Contractors";

import { FILTER_SETTINGS, HEADER_PROPS } from "./Objects";

import { CONTRATORS_ALL_LABELS } from "./ContractorsAll.labels";

import styles from "./ContractorsAll.module.css";

export const ContractorsAll = () => {
  const [contractorsData, setContractorsData] = useState<IAccordionProps[]>([]);
  const [sort, setSort] = useState(FILTER_SETTINGS);
  const [apiDataLoad, setApiDataLoad] = useState(false);

  const getContractorsFromAPI = useCallback(async () => {
    setApiDataLoad(true);
    const contractorsFromAPI = await getAllContractorsAPI(sort.sortBy, sort.sortType, sort.limit);
    setContractorsData(() => {
      return contractorsFromAPI.data.map((el: IContractorAPI) => {
        const leftSection = { leftContent: [el.address, `${el.zipcode} ${el.city}`, el.email], NIP: el.nip };
        const bottomMenu = [
          { label: CONTRATORS_ALL_LABELS.BOTTOM_ACCORDION_MENU_ADD_INVOICE, action: "wp.pl" },
          { label: CONTRATORS_ALL_LABELS.BOTTOM_ACCORDION_MENU_EDIT, action: "wp.pl" },
          { label: CONTRATORS_ALL_LABELS.BOTTOM_ACCORDION_MENU_INVOICES, action: "wp.pl" },
          { label: CONTRATORS_ALL_LABELS.BOTTOM_ACCORDION_MENU_DELETE, action: "wp.pl" },
        ];
        return { title: el.name, leftSection, rightSecion: false, bottomMenu };
      });
    });

    setApiDataLoad(false);
  }, [sort]);

  useEffect(() => {
    getContractorsFromAPI();
  }, [getContractorsFromAPI]);

  return (
    <>
      {apiDataLoad && (
        <Portal>
          <Loader type={"LOADING_DATA"} />
        </Portal>
      )}
      <div className={useStyles("container--full-width", styles["contractors-all"])}>
        <Header items={HEADER_PROPS} />
        <div className={useStyles("container--main", styles["container"])}>
          {contractorsData &&
            contractorsData.map((el, index) => {
              return <Accordion items={el} key={index} />;
            })}
        </div>
      </div>
    </>
  );
};

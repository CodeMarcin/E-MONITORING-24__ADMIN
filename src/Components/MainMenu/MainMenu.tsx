import { useState } from "react";

import { MainMenuItem } from "./MainMenuItem";

import { IMainMenuItems, IMainMenuSubItems } from "./Typescript/MainMenu.interface";

import { MAIN_MENU_LABELS } from "./MainMenu.labels";
import styles from "./MainMenu.module.css";

export const MainMenu = () => {
  const [subMenuItems, setSubMenuItems] = useState<IMainMenuSubItems[]>([]);

  const toggleSubMenu = (e: React.SyntheticEvent<HTMLLIElement, MouseEvent>) => {
    setSubMenuItems((prevState) => {
      prevState = [];
      const subMenu = MENU_ITEMS.find((el) => el.props.name === (e.target as HTMLLIElement).dataset.name);
      if (subMenu?.props.subItems) prevState = [...subMenu.props.subItems];
      return prevState;
    });
  };

  const clearSubMenu = () => {
    setSubMenuItems((prevState) => {
      prevState = [];
      return prevState;
    });
  };

  const MENU_ITEMS: IMainMenuItems[] = [
    {
      props: {
        name: "contractors",
        label: MAIN_MENU_LABELS.CONTRACTORS,
        active: false,
        callback: toggleSubMenu,
        subItems: [
          {
            name: "contractorsAll",
            label: MAIN_MENU_LABELS.CONTRACTORS_ALL,
            link: "",
          },
          {
            name: "contractorsAdd",
            label: MAIN_MENU_LABELS.CONTRACTORS_ADD,
            link: "",
          },
        ],
      },
    },
    {
      props: {
        name: "invoices",
        label: MAIN_MENU_LABELS.INVOICES,
        active: false,
        callback: toggleSubMenu,
        subItems: [
          {
            name: "invoicesAll",
            label: MAIN_MENU_LABELS.INVOICES_ALL,
            link: "",
          },
          {
            name: "invoicesAdd",
            label: MAIN_MENU_LABELS.INVOICES_ADD,
            link: "",
          },
        ],
      },
    },
    {
      props: {
        name: "offers",
        label: MAIN_MENU_LABELS.OFFERS,
        active: false,
        callback: toggleSubMenu,
        subItems: [
          {
            name: "offersAll",
            label: MAIN_MENU_LABELS.OFFERS_ALL,
            link: "",
          },
          {
            name: "offersAdd",
            label: MAIN_MENU_LABELS.OFFERS_ADD,
            link: "",
          },
        ],
      },
    },
    {
      props: {
        name: "settings",
        label: MAIN_MENU_LABELS.SETTINGS,
        link: "http://wp.pl",
        callback: clearSubMenu,
      },
    },
    {
      props: {
        name: "logout",
        label: MAIN_MENU_LABELS.LOGOUT,
        link: "http://wp.pl",
        callback: clearSubMenu,
      },
    },
  ];

  return (
    <div className={styles["main-menu"]}>
      <div className={styles["main-menu__container"]} onMouseLeave={clearSubMenu}>
        <ul className={styles["main-menu__container-section"]}>
          {MENU_ITEMS.map((el) => (
            <MainMenuItem props={el.props} />
          ))}
        </ul>
        <ul className={styles["main-menu__container-section"]}>
          {subMenuItems.map((el) => (
            <MainMenuItem props={el} />
          ))}
        </ul>
      </div>
    </div>
  );
};

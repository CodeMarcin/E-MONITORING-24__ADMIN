import { MAIN_MENU_LABELS } from "./MainMenu.labels";

export const MENU_ITEMS: IMainMenuItems[] = [
  {
    name: "contractors",
    label: MAIN_MENU_LABELS.CONTRACTORS,
    active: false,

    subItems: [
      {
        name: "contractorsAll",
        label: MAIN_MENU_LABELS.CONTRACTORS_ALL,
        link: "link",
      },
      {
        name: "contractorAdd",
        label: MAIN_MENU_LABELS.CONTRACTORS_ADD,
        link: "/contractorAdd",
      },
    ],
  },
  {
    name: "invoices",
    label: MAIN_MENU_LABELS.INVOICES,
    active: false,

    subItems: [
      {
        name: "invoicesAll",
        label: MAIN_MENU_LABELS.INVOICES_ALL,
        link: "link",
      },
      {
        name: "invoiceAdd",
        label: MAIN_MENU_LABELS.INVOICES_ADD,
        link: "link",
      },
    ],
  },
  {
    name: "offers",
    label: MAIN_MENU_LABELS.OFFERS,
    active: false,

    subItems: [
      {
        name: "offersAll",
        label: MAIN_MENU_LABELS.OFFERS_ALL,
        link: "link",
      },
      {
        name: "offersAdd",
        label: MAIN_MENU_LABELS.OFFERS_ADD,
        link: "link",
      },
    ],
  },
  {
    name: "settings",
    label: MAIN_MENU_LABELS.SETTINGS,
    link: "http://wp.pl",
  },
  {
    name: "logout",
    label: MAIN_MENU_LABELS.LOGOUT,
    link: "http://wp.pl",
  },
];

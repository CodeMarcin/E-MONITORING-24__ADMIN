/* eslint-disable react-hooks/rules-of-hooks */
import { IMainMenuItems } from "./Typescript/MainMenu.interface";

import { useStyles } from "../../Hooks/useStyles";

import { SVGArrowCircleIcon } from "../../Utilities/SVG";

import styles from "./MainMenu.module.css";

type TCallbackDivElement = (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
type TCallbackSVGElement = (e: React.SyntheticEvent<SVGElement, MouseEvent>) => void;
type TCallback = TCallbackDivElement & TCallbackSVGElement;

export const MainMenuItemMobile = (props: { items: IMainMenuItems; callback: TCallback }) => {
  const { items, callback } = props;
  const { name, label, link, active, subItems } = items;
  if (subItems)
    return (
      <div className={styles["item"]}>
        <div className={styles["item__header"]} onClick={callback} data-name={name}>
          <div className={styles["item__header-label"]}>{label}</div>
          <div className={useStyles(styles["item__header-icon"], active ? styles["item__header-icon--active"] : "")}>
            <SVGArrowCircleIcon size={20} clickCallback={callback} dataName={name} />
          </div>
        </div>
        {active &&
          subItems.map((el) => (
            <a className={styles["item__sub-link"]} href={el.link} key={el.label}>
              {el.label}
            </a>
          ))}
      </div>
    );
  else return <a href={link}>{label}</a>;
};

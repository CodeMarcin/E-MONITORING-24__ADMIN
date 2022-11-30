/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from "react-router-dom";

import { useStyles } from "../../Hooks/useStyles";

import { SVGArrowCircleIcon } from "../../Utilities/SVG";

import styles from "./MainMenu.module.css";

type TCallbackDivElement = (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => void;
type TCallbackSVGElement = (e: React.SyntheticEvent<SVGElement, MouseEvent>) => void;
type TCallbackHTMLElement = (e: React.SyntheticEvent<HTMLElement, MouseEvent>) => void;
type TCallback = TCallbackDivElement & TCallbackSVGElement;

export const MainMenuItemMobile = (props: { items: IMainMenuItems; toogleCallback: TCallback; clickCallback: TCallbackHTMLElement }) => {
  const { items, toogleCallback, clickCallback } = props;
  const { name, label, link, active, subItems } = items;
  if (subItems)
    return (
      <div className={styles["item"]}>
        <div className={styles["item__header"]} onClick={toogleCallback} data-name={name}>
          <div className={styles["item__header-label"]}>{label}</div>
          <div className={useStyles(styles["item__header-icon"], active ? styles["item__header-icon--active"] : "")}>
            <SVGArrowCircleIcon size={20} clickCallback={toogleCallback} dataName={name} />
          </div>
        </div>
        {active &&
          subItems.map((el) => (
            <Link className={styles["item__sub-link"]} to={el.link} key={el.label} onClick={clickCallback}>
              {el.label}
            </Link>
          ))}
      </div>
    );
  else 
    return (
      <>
        {link && (
          <Link to={link} onClick={clickCallback}>
            {label}
          </Link>
        )}
      </>
    );
};

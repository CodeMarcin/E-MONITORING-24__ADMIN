import { Link } from "react-router-dom";

import { useStyles } from "../../Hooks/useStyles";

import styles from "./MainMenu.module.css";

type TCallback = (e: React.SyntheticEvent<HTMLLIElement, MouseEvent>) => void;

export const MainMenuItem = (props: { items: IMainMenuItems; callback?: TCallback; clearCallback?: TCallback }) => {
  const { items, callback } = props;
  const { active, link, subItems, name, label } = items;

  let topMenuStyle = useStyles(styles["main-menu__link"], styles["main-menu__link--bold"]);
  if (active) topMenuStyle += ` ${styles["main-menu__link--active"]}`;

  if (!link && subItems)
    return (
      <li className={topMenuStyle} data-name={name} onMouseEnter={callback}>
        {label}
      </li>
    );
  else
    return (
      <li className={styles["main-menu__link"]} onMouseEnter={callback}>
        {link && <Link to={link}>{label}</Link>}
      </li>
    );
};

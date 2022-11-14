import { IMainMenuItems } from "./Typescript/MainMenu.interface";

import { useStyles } from "../../Hooks/useStyles";

import styles from "./MainMenu.module.css";

export const MainMenuItem = ({ props }: IMainMenuItems) => {
  const { label, name, link, callback } = props;
  const topMenuStyle = useStyles(styles["main-menu__link"], styles["main-menu__link--bold"]);

  if (!props.link)
    return (
      <li className={topMenuStyle} data-name={name} onMouseEnter={callback}>
        {label}
      </li>
    );
  else
    return (
      <li className={styles["main-menu__link"]} onMouseEnter={callback}>
        <a href={link}>{label}</a>
      </li>
    );
};

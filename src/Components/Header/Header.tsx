import { useStyles } from "../../Hooks/useStyles";

import styles from "./Header.module.css";

export const Header = (props: { items: IHeaderProps }) => {
  const { items } = props;
  const { title, subtitle } = items;
  return (
    <div className={styles["header"]}>
      <div className={useStyles("container--main", styles["content"])}>
        <span className={styles["content__title"]}>{title}</span>
        <span className={styles["content__subtitle"]}>{subtitle}</span>
      </div>
    </div>
  );
};

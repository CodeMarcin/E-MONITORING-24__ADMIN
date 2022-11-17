import { MainMenu } from "../../Components/MainMenu/MainMenu";
import { Input } from "../../Components/Input/Input";

import { IInputTextNumberPasswordProps } from "../../Components/Input/Typescript/Input.interface";

import { useStyles } from "../../Hooks/useStyles";

import styles from "./TopSection.module.css";

export const TopSection = () => {
  const SEARCH_INPUT_PROPS: IInputTextNumberPasswordProps = {
    props: {
      type: "text",
      label: "Szukaj",
      value: "",
      callbacks: {
        onChangeCallback: (e) => {},
      },
    },
  };

  return (
    <div className={useStyles("container--full-width", styles["top-section"])}>
      <div className={styles['top-section__container']}>
        <MainMenu />
        <Input props={SEARCH_INPUT_PROPS.props} />
      </div>
    </div>
  );
};

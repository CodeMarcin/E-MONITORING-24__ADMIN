import { useState } from "react";

import { MainMenu } from "../../Components/MainMenu/MainMenu";
import { Input } from "../../Components/Input/Input";

import { useStyles } from "../../Hooks/useStyles";

import styles from "./TopSection.module.css";

const SEARCH_INPUT_PROPS: IInputProps = {
  type: "text",
  label: "Szukaj",
  name: "search",
  showName: false,
  value: "",
};

export const TopSection = () => {
  const [inputsState, setInputsState] = useState(SEARCH_INPUT_PROPS);

  const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    setInputsState((prevState) => {
      prevState.value = (e.target as HTMLInputElement).value;
      return prevState;
    });
  };

  return (
    <div className={useStyles("container--full-width", styles["top-section"])}>
      <div className={styles["top-section__container"]}>
        <MainMenu />
        <Input items={inputsState} callbacks={{ onChangeCallback: changeValue }} />
      </div>
    </div>
  );
};

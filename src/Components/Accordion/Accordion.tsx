/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

import { SVGArrowCircleIcon, SVGCLoopIcon, SVGCSaveIcon, SVGCSendMailIcon } from "../../Utilities/SVG";

import { useStyles } from "../../Hooks/useStyles";

import { ACCORDIONS_LABELS } from "./Accordion.labels";

import styles from "./Accordion.module.css";

export const Accordion = (props: { items: IAccordionProps }) => {
  const { items } = props;
  const { title, leftSection, rightSection, rightSectionCallbacks, bottomMenu } = items;
  const { leftContent, NIP } = leftSection;

  const [contentVisible, setContentVisible] = useState<boolean>(false);

  const toggleContentVisible = () => {
    setContentVisible((prevState) => (prevState = !prevState));
  };

  const prepareMenuItem = (el: IAccordionPropsBottomMenu) => {
    if (typeof el.action === "string")
      return (
        <a className={styles["accordion__menu-item"]} href={el.action}>
          {el.label}
        </a>
      );
    else
      return (
        <span className={styles["accordion__menu-item"]} onClick={el.action}>
          {el.label}
        </span>
      );
  };

  return (
    <div className={styles["accordion"]}>
      <div className={styles["accordion__header"]} onClick={toggleContentVisible}>
        <div className={styles["accordion__header-title"]}>{title}</div>
        <div className={useStyles(styles["accordion__header-icon"], contentVisible ? styles["accordion__header-icon--active"] : "")}>
          <SVGArrowCircleIcon size={20} />
        </div>
      </div>

      {contentVisible && (
        <>
          <div className={styles["accordion__container"]}>
            <div className={styles["section"]}>
              {leftSection.leftTitle && <p className={styles["section-title"]}>{leftSection.leftTitle}</p>}
              {leftContent.map((el, index) => (
                <p key={index}>{el}</p>
              ))}
              <div className={styles["section__nip"]}>
                <span className={styles["section__nip-label"]}>{ACCORDIONS_LABELS.NIP}: </span> {NIP}
              </div>
            </div>
            {rightSection && (
              <div className={useStyles(styles["section"], styles["section--right"])}>
                <SVGCLoopIcon size={35} clickCallback={rightSectionCallbacks?.loopCallback} />
                <SVGCSaveIcon size={35} clickCallback={rightSectionCallbacks?.saveCallback} />
                <SVGCSendMailIcon size={35} clickCallback={rightSectionCallbacks?.sendCallback} />
              </div>
            )}
          </div>
          <ul className={styles["accordion__menu"]}>
            {bottomMenu.map((el) => (
              <li key={el.label}>{prepareMenuItem(el)}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

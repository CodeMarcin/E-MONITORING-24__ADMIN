import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Portal } from "../Portal/Portal";

import { SVGMobileMenuOpenIcon, SVGOkIcon, SVGErrorIcon, SVGConfirmIcon } from "../../Utilities/SVG";

import styles from "./PopupModal.module.css";

export const PopupModal = (props: { items: IPopupModalProps }) => {
  const { items } = props;
  const { title, buttons, icon, text, toggleModalCallback } = items;

  const getIcon = (): JSX.Element | boolean => {
    if (!icon) return false;
    return icon === "OK" ? (
      <SVGOkIcon size={100} color={"#24FF00"} />
    ) : icon === "ERROR" ? (
      <SVGErrorIcon size={100} color={"#EC1F26"} />
    ) : (
      <SVGConfirmIcon size={100} color={"#0085FF"} />
    );
  };

  return (
    <Portal>
      <div className={styles["modal"]}>
        <div className={styles["container"]}>
          <div className={styles["popup"]}>
            <div className={styles["popup-close-icon"]}>
              <SVGMobileMenuOpenIcon size={15} clickCallback={toggleModalCallback} />
            </div>
            {icon && <div className={styles["popup__icon"]}>{getIcon()}</div>}
            <div className={styles["popup__title"]}>{title}</div>
            {text && <div className={styles["popup__text"]}>{text}</div>}
            {items.checkbox && <Input items={items.checkbox} callbacks={{ onChangeCallback: () => {} }} />}
            {buttons?.length !== 0 && (
              <div className={styles["popup__buttons"]}>
                {buttons.map((el) => (
                  <Button items={el} key={el.value} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

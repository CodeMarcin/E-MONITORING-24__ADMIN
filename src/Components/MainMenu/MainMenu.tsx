import { useState, useRef } from "react";

import { MainMenuItem } from "./MainMenuItem";
import { MainMenuItemMobile } from "./MainMenuItemMobile";

import { SVGMobileMenuCloseIcon, SVGMobileMenuOpenIcon } from "../../Utilities/SVG";

import { MENU_ITEMS } from "./Objects";
import styles from "./MainMenu.module.css";

export const MainMenu = () => {
  const [mainMenuItems, setMainMenuItems] = useState<IMainMenuItems[]>(MENU_ITEMS);
  const [subMenuItems, setSubMenuItems] = useState<IMainMenuSubItems[]>([]);
  const [mobileMenuActive, setMobileMenuActive] = useState<boolean>(false);

  const mobileMenuContentRef = useRef<HTMLDivElement>(null);

  const setActiveMenuItem = (e: React.SyntheticEvent<HTMLLIElement, MouseEvent>) => {
    setMainMenuItems((prevState) => {
      prevState.forEach((el) => {
        if (el.name === (e.target as HTMLLIElement).dataset.name) el.active = true;
        else el.active = false;
      });
      return [...prevState];
    });

    setSubMenuItems((prevState) => {
      prevState = [];
      const subMenu = mainMenuItems.find((el) => el.active);
      if (subMenu?.subItems) prevState = [...subMenu.subItems];
      return [...prevState];
    });
  };

  const setActiveMenuItemMobile = (e: React.SyntheticEvent<HTMLDivElement, MouseEvent> | React.SyntheticEvent<SVGElement, MouseEvent> | React.SyntheticEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const eventTarget = e.target as HTMLDivElement;
    const parentElement = eventTarget.parentElement as HTMLDivElement;
    setMainMenuItems((prevState) => {
      const itemToChange = prevState.find((el) => el.name === eventTarget.dataset.name || el.name === parentElement?.dataset.name);
      if (itemToChange) itemToChange.active = !itemToChange.active;
      return [...prevState];
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuActive((prevState) => !prevState);
    if (mobileMenuContentRef.current) mobileMenuContentRef.current.classList.toggle(styles["mobile-menu--active"]);
  };

  const clearActiveMenu = () => {
    setMainMenuItems((prevState) => {
      prevState.forEach((el) => (el.active = false));
      return [...prevState];
    });
    setSubMenuItems((prevState) => {
      prevState = [];
      return [...prevState];
    });
  };

  return (
    <>
      <div className={styles["main-menu"]} onMouseLeave={clearActiveMenu}>
        <ul className={styles["main-menu__section"]}>
          {mainMenuItems.map((el) => (
            <MainMenuItem items={el} callback={setActiveMenuItem} clearCallback={clearActiveMenu} key={el.name} />
          ))}
        </ul>
        <ul className={styles["main-menu__section"]}>
          {subMenuItems.map((el) => (
            <MainMenuItem items={el} key={el.name} />
          ))}
        </ul>
      </div>

      <div className={styles["main-menu--mobile"]} onClick={toggleMobileMenu}>
        {mobileMenuActive ? <SVGMobileMenuOpenIcon size={25} /> : <SVGMobileMenuCloseIcon size={25} />}
      </div>

      <div className={styles["mobile-menu"]} ref={mobileMenuContentRef}>
        <div className={styles["mobile-menu__content"]}>
          {mainMenuItems.map((el) => (
            <MainMenuItemMobile items={el} key={el.name} toogleCallback={setActiveMenuItemMobile} clickCallback={toggleMobileMenu} />
          ))}
        </div>
      </div>
    </>
  );
};

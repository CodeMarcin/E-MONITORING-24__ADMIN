import { EMainMenuItems } from "./MainMenu.enum";

export interface IMainMenuItems {
  props: {
    name: string;
    label: string;
    link?: string;
    active?: boolean;
    subItems?: IMainMenuSubItems[];
    callback?: ((e: React.SyntheticEvent<HTMLLIElement, MouseEvent>) => void) | (() => void);
  };
}

export interface IMainMenuSubItems {
  name: string;
  label: string;
  link: string;
}

export interface IMainMenuItems {
  name: string;
  label: string;
  link?: string;
  active?: boolean;
  subItems?: IMainMenuSubItems[];
}

export interface IMainMenuSubItems {
  name: string;
  label: string;
  link: string;
}

export interface IButtonProps {
  type: "BASIC" | "SECOND";
  width: "FULL" | "FLEX";
  value: string;
  callbacks: {
    onClickCallback: () => void;
  };
}

export interface ISpecifyButton {
  className: string;
  value: string;
  callbacks: {
    onClickCallback: () => void;
  };
}

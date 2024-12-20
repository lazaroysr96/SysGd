import { FC, HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  isDisabled,
  children,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      className="bg-slate-600 py-1.5 px-5 rounded text-white hover:bg-slate-500 disabled:opacity-65 disabled:hover:bg-slate-600 disabled:cursor-not-allowed transition duration-500"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

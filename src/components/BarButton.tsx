import { FC } from "react";
import { IconType } from "react-icons";

export type BarButtonProps = {
  label: string;
  onClick: () => void;
  Icon: IconType
};

const BarButton: FC<BarButtonProps> = ({ label, onClick, Icon }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 text-white hover:bg-slate-400 w-full text-left text-base flex gap-2 items-center"
    >
      <Icon/> {label}
    </button>
  );
};

export default BarButton;

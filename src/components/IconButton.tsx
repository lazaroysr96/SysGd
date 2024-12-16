import { FC } from "react";
import { IconType } from "react-icons";

export type IconButtonProps = {
    tooltip: string
  onClick: () => void;
  Icon: IconType;
};

const IconButton: FC<IconButtonProps> = ({ onClick, Icon, tooltip }) => {
  return (
    <button
      title={tooltip}
      onClick={onClick}
      className="p-2 hover:bg-neutral-100 text-slate-600 size-9 rounded-full text-lg flex items-center justify-center"
    >
      <Icon />
    </button>
  );
};

export default IconButton;

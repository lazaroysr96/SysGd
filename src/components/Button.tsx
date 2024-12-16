import { FC } from "react";

const Button: FC<{ label: string }> = ({ label }) => {
  return (
    <button className="bg-slate-600 py-1.5 px-5 rounded text-white hover:bg-slate-500">
      {label}
    </button>
  );
};

export default Button;

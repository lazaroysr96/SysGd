import { FC } from "react";

const Input: FC<{ label: string, type:string }> = ({ label, type }) => {
  return (
    <label className="flex flex-col gap-0.5">
      <span>{label}</span>
      <input type={type} className="border outline-none py-1 px-2 rounded"/>
    </label>
  );
};

export default Input;

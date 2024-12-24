import { FC } from "react";
import ToolBar from "./ToolBar";
import Text from "./Text";

const SecondarySidebar: FC = () => {
  return (
    <>
      <div className="max-w-64 w-full h-full overflow-auto border-l dark:border-slate-700 bg-white dark:bg-slate-950 flex flex-col gap-2">
        <ToolBar />

        <div className="flex size-full flex-col overflow-auto">
          <div className="flex flex-col gap-2 px-2 pb-2">
            <Text label="Autor:" />
            <Text label="Fecha de Creación:" />
            <Text label="Fecha de Modificación:" />
            <Text label="Notas:" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondarySidebar;

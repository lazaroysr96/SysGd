import { FC } from "react";
import useExportTable from "../hooks/useExportTable";
import usePrint from "../hooks/usePrint";
import Text, { Variant } from "../pages/Text";
import IconButton from "./IconButton";
import { IoPrint } from "react-icons/io5";
import { IoIosAddCircle, IoIosDownload } from "react-icons/io";

const ToolBar: FC = () => {
  const { exportToXlsx } = useExportTable();
  const { print } = usePrint();

  return (
    <div className="w-full h-10 flex min-h-10 border-b border-slate-200 items-center px-2 bg-white dark:bg-slate-900 dark:border-t dark:border-slate-800">
      <Text
        label="Edición"
        className="w-full font-medium text-slate-600 dark:text-slate-200"
        variant={Variant.Span}
      />
      <IconButton
        Icon={IoPrint}
        onClick={print}
        tooltip="Imprimir"
        variant={2}
      />
      <IconButton
        Icon={IoIosDownload}
        onClick={exportToXlsx}
        tooltip="Descargar"
        variant={2}
      />
      <IconButton
        Icon={IoIosAddCircle}
        onClick={() => {}}
        tooltip="Nuevo"
        variant={2}
      />
    </div>
  );
};

export default ToolBar;

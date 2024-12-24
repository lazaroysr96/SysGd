import { FC } from "react";
import useExportTable from "../hooks/useExportTable";
import usePrint from "../hooks/usePrint";
import Text, { Variant } from "./Text";
import IconButton from "./IconButton";
import { IoPrint } from "react-icons/io5";
import { IoIosDownload } from "react-icons/io";
import useAlertDialog from "../hooks/useAlertDialog";

const ToolBar: FC = () => {
  const { exportToXlsx } = useExportTable();
  const { print } = usePrint();

  const {AlertDialogComponent: DialogComponent,openDialog} = useAlertDialog()
  const dialogPrint = useAlertDialog()

  return (
    <div className="w-full h-10 flex min-h-10 border-b border-slate-200 items-center px-2 bg-white dark:bg-slate-900 dark:border-t dark:border-slate-800">
      <Text
        label="Detalles"
        className="w-full font-medium text-slate-600 dark:text-slate-200"
        variant={Variant.Span}
      />
      <IconButton
        Icon={IoPrint}
        onClick={dialogPrint.openDialog}
        tooltip="Imprimir"
        variant={2}
      />
      <IconButton
        Icon={IoIosDownload}
        onClick={openDialog}
        tooltip="Descargar"
        variant={2}
      />
      {DialogComponent(exportToXlsx,"¿Desea exportar este documento a Excel?")}
      {dialogPrint.AlertDialogComponent(print, "¿Desea imprimir este documento?")}
    </div>
  );
};

export default ToolBar;

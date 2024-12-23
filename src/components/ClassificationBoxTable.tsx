import { FC, useEffect, useState } from "react";
import Table, { Row } from "./BasicTableComponents";
import useEditableTable from "../hooks/useEditableTable";
import Button from "./Button";
import { useToast } from "../hooks/useToast";
import useConnection from "../hooks/useConnection";
import { spanish } from "../lang/spanish";
import useGetData from "../hooks/useGetData";
import Text from "./Text";
import Loading from "./Loading";

export type ClassificationBoxTableData = {
  code: string;
  document: string;
};

export type ClassificationBoxTableProps = {
  company: string;
  archiveName: string;
  code: string;
};

const ClassificationBoxTable: FC<ClassificationBoxTableProps> = ({
  company,
  archiveName,
  code,
}) => {
  const [previousRows, setPreviousRows] = useState<Row[]>([
    { field1: "", field2: "" },
  ]);
  const { rows, addRow, updateRow, saveAllRows } =
    useEditableTable(previousRows);
  const { addToast: toast } = useToast();
  const { handleAddClassificationBoxData } = useConnection();
  const [isLoading, setIsLoading] = useState(false);
  const { data, error, loading } = useGetData(code);

  const handleSaveData = (data: string) => {
    handleAddClassificationBoxData(
      code,
      data,
      () => {
        toast(spanish.save_done, "positive");
        setIsLoading(false);
      },
      () => {
        toast(spanish.save_error, "negative");
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    console.log("code", code);
    console.log("data", data);
  }, [code]);

  if (error) {
    return (
      <div className="flex flex-col size-full bg-slate-200 dark:bg-slate-950 items-center justify-center">
        <Text variant={0} label="Error de Conexión" />
        <Text variant={0} label={error} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col size-full bg-slate-200 dark:bg-slate-950 items-center justify-center">
        <Loading/>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full overflow-auto">
      <div className="w-full flex justify-center p-2 items-center">
        <div className="bg-white dark:bg-slate-900 py-5 px-10 border dark:border-slate-700 flex flex-col shadow w-full max-w-[21.59cm] min-h-[27.54cm] rounded">
          <div id="content">
            <Table>
              <thead className="">
                <tr>
                  <th colSpan={2} className="py-2">
                    <div className="flex">
                      <div className="w-full">{spanish.annex}</div>
                      <div className="w-full text-right"> OT-RG 0801. A9</div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan={2}
                    className="text-center py-2 text-base uppercase"
                  >
                    <div>Cuadro de Clasificación</div>
                    <div>{company}</div>
                  </th>
                </tr>
                <tr>
                  <th colSpan={2} className="text-left py-2 text-sm uppercase">
                    <div>
                      Archivo de gestión:{" "}
                      <span className="font-normal">{archiveName}</span>
                    </div>
                    <div>Documentos generados</div>
                  </th>
                </tr>
                <TableHeading />
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td
                        className="border p-2 dark:border-gray-700 break-words max-w-28"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          updateRow(index, "field1", e.currentTarget.innerText)
                        }
                      >
                        {row.field1}
                      </td>
                      <td
                        className="border p-2 dark:border-gray-700 break-words max-w-28"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          updateRow(index, "field2", e.currentTarget.innerText)
                        }
                      >
                        {row.field2}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="py-2 flex gap-2">
              <Button onClick={addRow}>{spanish.add_row}</Button>
              <Button
                isDisabled={isLoading}
                onClick={() => {
                  saveAllRows(handleSaveData);
                  toast(spanish.save_done, "positive");
                }}
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationBoxTable;

const TableHeading: FC = () => {
  return (
    <tr className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-900 dark:text-gray-400">
      <th className="p-2 border dark:border-gray-700">Código</th>
      <th className="p-2 border dark:border-gray-700">
        Series y Subseries Documentales
      </th>
    </tr>
  );
};

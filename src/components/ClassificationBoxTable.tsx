import { FC } from "react";

const ClassificationBoxTable: FC = () => {
  return (
    <div className="size-full p-2 flex flex-col items-center bg-neutral-50 overflow-auto">
        <div className="bg-white p-5 border shadow w-[21.59cm]">
        <div>ANEXO	OT-RG 0801. A9 Cuadro de Clasificación</div>
        <div>Archivo de gestión: OT37.1.1 Dirección</div>
        <div>Documentos generados</div>
        <div>
    <table>
      <TableHeading />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
      <Table />
    </table>
    </div>
    </div>
    </div>
  );
};

export default ClassificationBoxTable;

const TableHeading: FC = () => {
  return (
    <tr>
      <th className="p-2 border">Código</th>
      <th className="p-2 border w-full text-left">Series y Subseries Documentales</th>
    </tr>
  );
};

const Table: FC = () => {
  return (
    <tr>
      <td className="p-2 border">OT37.1.1.1 </td>
      <td className="p-2 border">Expediente gestión documental y archivos</td>
    </tr>
  );
};

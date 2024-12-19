import { FC } from "react";
import ClassificationBoxTable from "../components/ClassificationBoxTable";
import Button from "../components/Button";

const Print: FC = () => {
  return (
    <div className="bg-slate-200">
      <ClassificationBoxTable />
      <div className="fixed bottom-10 right-10 print:hidden">
        <Button
          label="Imprimir"
          onClick={() => {
            window.print();
          }}
        />
      </div>
    </div>
  );
};

export default Print;

import { FC } from "react";
import ClassificationBoxTable from "./ClassificationBoxTable";

const ClassificationBox: FC = () => {
  return (
    <div className="flex size-full overflow-auto">
      <div className="w-full h-full overflow-auto">
        <ClassificationBoxTable/>
      </div>
      <div className="max-w-64 w-full h-full overflow-auto"></div>
    </div>
  );
};

export default ClassificationBox;

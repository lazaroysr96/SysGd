import { FC } from "react";
import ClassificationBox from "../components/ClassificationBox";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const App: FC = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Sidebar/>

      <div className="size-full flex flex-col">
        <Navbar/>
        <ClassificationBox/>
      </div>
    </div>
  );
};

export default App;

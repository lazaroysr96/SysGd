import { FC } from "react";
import ClassificationBox from "../components/ClassificationBox";
import Sidebar from "../components/Sidebar";
import HeadBar from "../components/HeadBar";
import NavBar from "../components/Navbar";

const App: FC = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      <HeadBar />
      <div className="size-full flex overflow-auto">

        <NavBar/>
        <Sidebar />

        <ClassificationBox />
      </div>
    </div>
  );
};

export default App;

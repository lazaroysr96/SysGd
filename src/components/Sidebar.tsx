import { FC } from "react";
import BarButton from "./BarButton";
import { IoArchive, IoHome } from "react-icons/io5";
import { IoIosApps, IoLogoGithub } from "react-icons/io";
import Text, { Variant } from "../pages/Text";

const Sidebar: FC = () => {
  return (
    <>
      <div className="w-80 h-screen flex flex-col items-center bg-slate-500">
        <div className="w-full h-10 flex items-center gap-1 px-2 bg-slate-600">
          <div>
            <IoIosApps size={24} color="white" />
          </div>
          <Text
            variant={Variant.Heading}
            label="SYSGD"
            className="text-white w-full"
          />
          <div>
            <IoLogoGithub size={24} color="white" />
          </div>
        </div>
        <BarButton onClick={() => {}} Icon={IoHome} label="Inicio" />
        <BarButton
          onClick={() => {}}
          Icon={IoArchive}
          label="Cuadro de clasificacón"
        />
        <BarButton
          onClick={() => {}}
          Icon={IoArchive}
          label="Registro de entrada"
        />
        <BarButton
          onClick={() => {}}
          Icon={IoArchive}
          label="Registro de Salida"
        />
        <BarButton
          onClick={() => {}}
          Icon={IoArchive}
          label="Registro de prestamo"
        />
        <BarButton
          onClick={() => {}}
          Icon={IoArchive}
          label="Registro topografico"
        />
      </div>
    </>
  );
};

export default Sidebar;

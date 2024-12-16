import { FC } from "react";
import IconButton from "./IconButton";
import Text, { Variant } from "../pages/Text";
import { IoNotifications, IoPerson, IoPrint, IoSearch } from "react-icons/io5";

const Navbar: FC = () => {
  return (
      <div className="w-full h-10 border-b items-center px-2 flex">
        <Text label="Inicio" className="w-full" variant={Variant.Heading} />
        <IconButton tooltip="Imprimir" Icon={IoPrint} onClick={() => {}} />
        <IconButton tooltip="Buscar" Icon={IoSearch} onClick={() => {}} />
        <IconButton
          tooltip="Notificaciones"
          Icon={IoNotifications}
          onClick={() => {}}
        />
        <IconButton tooltip="Cuenta" Icon={IoPerson} onClick={() => {}} />
      </div>
  );
};

export default Navbar;

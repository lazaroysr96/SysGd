import { FC } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Text, { Variant } from "./Text";
import { IoIosApps } from "react-icons/io";

const Login: FC = () => {
  return (
    <div className="flex items-center justify-center bg-slate-800 h-screen">
      <div className="bg-white w-80 h-max rounded px-2 py-4 flex items-center flex-col gap-2 shadow">
        <div className="flex items-center flex-col justify-center">
          <div className="flex gap-1 w-max items-center justify-center">
            <div>
              <IoIosApps size={24} />
            </div>
            <Text label="SYSGD" variant={Variant.Heading} />
          </div>

          <Text label="Conectar con la base de datos" variant={Variant.Span} />
        </div>

        <Input label="Host" type="text" />
        <Input label="Base de datos" type="password" />
        <Input label="Usuario" type="text" />
        <Input label="Contraseña" type="password" />
        <Button label="Conectar" />
      </div>
    </div>
  );
};

export default Login;

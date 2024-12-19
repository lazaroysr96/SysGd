import { FC, useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Text, { Variant } from "./Text";
import { IoIosApps } from "react-icons/io";

const Login: FC = () => {
  const [host, setHost] = useState("");
  const [databaseName, setDatabaseName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [info, setInfo] = useState("");

  useEffect(() => {}, []);

  const loginDB = () => {
    const form = new FormData();
    form.append("host", host);
    form.append("db_name", databaseName);
    form.append("user", user);
    form.append("pass", password);

    const req = new XMLHttpRequest();
    req.onload = () => {
      setInfo(req.responseText);
    };

    req.onerror = () => {
      alert("Error");
    };

    req.open("POST", "http://localhost/apps/sysgd/api.php");
    req.setRequestHeader("Content-Type","application/json")
    req.send(form);
  };

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

        <Input onChange={setHost} label="Host" type="text" />
        <Input onChange={setDatabaseName} label="Base de datos" type="text" />
        <Input onChange={setUser} label="Usuario" type="text" />
        <Input onChange={setPassword} label="Contraseña" type="password" />
        <Button label="Conectar" onClick={loginDB} />
        <Text label={info} variant={Variant.Span} />
      </div>
    </div>
  );
};

export default Login;

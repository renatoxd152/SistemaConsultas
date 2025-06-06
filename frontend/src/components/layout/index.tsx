import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import React, { ReactNode, useEffect, useState } from "react";
import { Alert, Mensagem } from "../common/mensagem";
import { Menu } from "./menu";
interface LayoutProps {
  titulo: string;
  children?: ReactNode;
  className?: string;
  tittleClassName?: string;
  mensagens?: Array<Alert>;
}

interface TokenPayload {
  sub: string; 
  roles:string[];
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const [emailUsuario, setEmailUsuario] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const isAdmin = roles.includes("ROLE_ADMINISTRATOR");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setEmailUsuario(decoded.sub);
        setRoles(decoded.roles || []);
      } catch (e) {
        console.error("Erro ao decodificar token:", e);
      }
    }
  }, []);

  return (
    <div>
      <section>
        <Menu />
        <div className={`container ${props.className}`}>
        <div className="d-flex align-items-center justify-content-between mt-3">
          <header>
            <p className={props.tittleClassName}>{props.titulo}</p>
          </header>
          {emailUsuario && (
  <div className="dropdown ms-auto">
    <div
      className="d-flex align-items-center gap-2 dropdown-toggle"
      id="userDropdown"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      role="button"
      style={{ cursor: "pointer" }}
    >
      <div className="fw-bold">Olá, {emailUsuario}</div>
      <div
        className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
        style={{ width: "40px", height: "40px" }}
      >
        {emailUsuario.charAt(0).toUpperCase()}
      </div>
    </div>
    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
      {
        isAdmin &&
        ( <li><a className="dropdown-item" href="/configuracoes"> <FontAwesomeIcon icon={faCog} color="gray" className="me-2" />Configurações</a></li>)
      }
     
      <li><button className="dropdown-item" onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>  <FontAwesomeIcon icon={faSignOutAlt} color="red" className="me-2" />Sair</button></li>
    </ul>
  </div>
)}

        </div>

          <div>
            <div>
              {props.mensagens &&
                props.mensagens.map((msg) => (
                  <Mensagem key={msg.texto} {...msg} />
                ))}

              {props.children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

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
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const [emailUsuario, setEmailUsuario] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setEmailUsuario(decoded.sub);
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
            <div className="d-flex align-items-center gap-2 ms-auto">
              <div className="fw-bold">Olá, {emailUsuario}</div>
              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{ width: "40px", height: "40px" }}
              >
                {emailUsuario.charAt(0).toUpperCase()}
              </div>
              
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

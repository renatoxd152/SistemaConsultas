import React, { ReactNode } from "react";
import { Alert, Mensagem } from "../../common/mensagem";
interface LayoutProps{
    titulo:string;
    children?:ReactNode;
    className?:string;
    tittleClassName?:string;
    styleDiv?:React.CSSProperties;
     mensagens?:Array<Alert>;
}
export const LayoutTelaInicial:React.FC<LayoutProps> = (props:LayoutProps) =>
{
    return(
        <div style={props.styleDiv}>
            <section>
                <div className={`container ${props.className}`}>
                    <div>
                        <header>
                            <p className={props.tittleClassName}>{props.titulo}</p>
                        </header>    
                    </div>
            
                    <div>
                        <div>
                            {
                                props.mensagens && props.mensagens.map(msg=>
                                    <Mensagem key={msg.texto} {...msg}/>
                                )
                            }
                            {props.children}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
import React, { ReactNode } from "react";
import { Menu } from "./menu";
interface LayoutProps{
    titulo:string;
    children?:ReactNode;
    className?:string;
}
export const Layout:React.FC<LayoutProps> = (props:LayoutProps) =>
{
    return(
        <div>
            <section>
                <Menu/>
                <div className={`container ${props.className}`}>
                    <div>
                        <header>
                            <p>{props.titulo}</p>
                        </header>    
                    </div>
            
                    <div>
                        <div>
                            {props.children}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
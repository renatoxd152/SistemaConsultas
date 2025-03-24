import React from "react";

interface MensagemProps
{
    field?:string;
    texto?:string;
}
export interface Alert
{
    field:string;
    texto:string;
}
export const Mensagem:React.FC<MensagemProps>=(
    {
        field,texto
    }) =>
{
    return(
        <article>
            <div className={field} role="alert">{texto}</div>
        </article>
        
    )
}
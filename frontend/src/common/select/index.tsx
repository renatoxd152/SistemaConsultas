import React, { InputHTMLAttributes } from "react";

interface Opcao{
    value:string;
    label:string;
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    id?:string;
    name:string;
    label:string;
    opcoes:Array<Opcao>;
    className:string;
}
export const Select:React.FC<InputProps> = ({
    id,
    name,
    label,
    opcoes,
    className
}: InputProps) =>
{
    return(
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <div>
                <select name={name} id={id}>
                    {
                        opcoes.map((opcao)=>
                        (
                            <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                        ))
                    }
                
                </select>
            </div>
        </div>
    )
}
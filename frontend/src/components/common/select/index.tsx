import React, { SelectHTMLAttributes } from "react";

interface Opcao{
    value:string;
    label:string;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>
{
    id?:string;
    name:string;
    label:string;
    opcoes:Array<Opcao>;
    className:string;
    selectClassName?:string;
    labelClassName?:string;
}
export const Select:React.FC<SelectProps> = ({
    id,
    name,
    label,
    opcoes,
    className,
    selectClassName,
    labelClassName,
    onChange,
}: SelectProps) =>
{
    return(
        <div className={className}>
            <label htmlFor={id} className={labelClassName}>{label}</label>
            <div>
                <select name={name} id={id} className={selectClassName} onChange={onChange}>
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
import React, { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    id:string,
    type:string;
    TextLabel:string;
    error?:string;
    className?:string;
}
export const Input:React.FC<InputProps> = ({
    id,
    type,
    onChange,
    TextLabel,
    error,
    className
}:InputProps) =>
{
    return(
        <div className={className}>
            <label htmlFor={id}>{TextLabel}</label>
            <div>
                <input type={type} id={id} onChange={onChange} />
            </div>
            {
                error &&
                <p>{error}</p>
            }
        </div>
    )
}
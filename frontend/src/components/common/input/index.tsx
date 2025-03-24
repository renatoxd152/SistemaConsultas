import React, { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    id:string,
    type:string;
    TextLabel:string;
    error?:string;
    className?:string;
    inputClassName?:string;
}
export const Input:React.FC<InputProps> = ({
    id,
    type,
    onChange,
    TextLabel,
    error,
    className,
    inputClassName,
    ...props
    
}:InputProps) =>
{
    return(
        <div className={className}>
            <label htmlFor={id}>{TextLabel}</label>
            <div>
                <input type={type} id={id} onChange={onChange} className={inputClassName} {...props}/>
            </div>
            {
                error &&
                <p>{error}</p>
            }
        </div>
    )
}
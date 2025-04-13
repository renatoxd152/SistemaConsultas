import React, { InputHTMLAttributes } from "react";
import { formatarCPF, formatarRG } from "../../../app/util/cpf";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name?:string;
  type?: string;
  TextLabel?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
  icone?: string;
  formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
    id,
    type,
    onChange,
    TextLabel,
    error,
    className,
    inputClassName,
    errorClassName,
    icone,
    formatter,
    name,
    ...props
  }: InputProps) => {

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      const name = event.target.name;

      const formattedValue = (formatter && formatter(value as string)) || value
      if (onChange) {
          onChange({
              ...event,
              target: {
                  ...event.target,
                  name,
                  value: formattedValue,
              },
          });
      }
  };

    return (
      <div className={className}>
        {TextLabel && <label htmlFor={id}>{TextLabel}</label>}
        <div className="input-group mb-2" style={{ display: 'flex', alignItems: 'stretch' }}>
          {icone && (
            <div className="input-group-prepend" style={{ display: 'flex' }}>
              <div 
                className="input-group-text"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.375rem 0.75rem',
                  height: '100%',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}
              >
                <i className={icone}></i>
              </div>
            </div>
          )}
          <input
            type={type}
            id={id}
            name={name}
            onChange={onInputChange}
            className={inputClassName}
            style={{
              flex: 1,
              borderTopLeftRadius: icone ? 0 : undefined,
              borderBottomLeftRadius: icone ? 0 : undefined
            }}
            {...props}
          />
        </div>
        {error && <p className={errorClassName}>{error}</p>}
      </div>
    );
  };

  export const InputCPF:React.FC<InputProps> = (props:InputProps) =>
  {
      return(
        <Input {...props} formatter={formatarCPF}/>
      )
  }

  export const InputRG:React.FC<InputProps> = (props:InputProps) =>
    {
        return(
          <Input {...props} formatter={formatarRG}/>
        )
    }
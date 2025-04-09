import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type?: string;
  TextLabel?: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
  icone?: string;
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
    ...props
  }: InputProps) => {
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
            onChange={onChange}
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
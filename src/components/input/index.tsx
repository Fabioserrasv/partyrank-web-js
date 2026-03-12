'use client'
import React, { forwardRef } from 'react';
import './input.scss';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  displayName: string;
  name: string;
  errorMessage?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ displayName, errorMessage, name, required, value, defaultValue, ...rest }: InputProps, ref) => {
  const valueProps = value !== undefined
    ? { value }
    : { defaultValue };
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{displayName} {required ? <span className='required'>*</span> : <></>} {errorMessage ? <span className='error'>{errorMessage}</span> : <></>} </label>
      <input
        ref={ref}
        {...rest}
        {...valueProps}
        autoComplete="off"
        name={name}
      />
    </div>
  );
});

Input.displayName = 'Input';

export { Input };

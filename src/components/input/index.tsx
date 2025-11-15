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

const Input = forwardRef<HTMLInputElement, InputProps>(({ displayName, errorMessage, name, required, ...rest }: InputProps, ref) => {
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{displayName} {required ? <span className='required'>*</span> : <></>} {errorMessage ? <span className='error'>{errorMessage}</span> : <></>} </label>
      <input
        ref={ref}
        {...rest}
        autoComplete="off"
        name={name}
      />
    </div>
  );
});

Input.displayName = 'Input';

export { Input };

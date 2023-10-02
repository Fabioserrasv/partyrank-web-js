'use client'
import React, { forwardRef } from 'react'
import './input.scss';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  displayName: string;
  name: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ displayName, errorMessage, name, ...rest }: InputProps, ref) => {
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{displayName} {errorMessage ? <span className='error'>{errorMessage}</span> : <></>} </label>
      <input
        ref={ref}
        {...rest}
        autoComplete="off"
        name={name}
      />
    </div>
  )
})
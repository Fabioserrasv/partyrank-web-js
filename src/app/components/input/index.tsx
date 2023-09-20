'use client'
import React, { forwardRef } from 'react'
import './input.scss';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  displayName: string;
  name: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ displayName, name, ...rest }: InputProps, ref) => {
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{displayName}</label>
      <input
        ref={ref}
        {...rest}
        name={name}
      />
    </div>
  )
})
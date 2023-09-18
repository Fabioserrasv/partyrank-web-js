import React, { useEffect, useRef } from 'react'
import './input.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  displayName: string;
  name: string;
}

export function Input({ displayName, name, ...rest }: InputProps) {
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{displayName}</label>
      <input
        name={name}
        {...rest}
      />
    </div>
  )
}
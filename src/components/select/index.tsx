'use client'
import React, { ReactNode, forwardRef } from 'react'
import './select.scss';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  displayName: string;
  name: string;
  errorMessage?: string;
  children?: ReactNode;
  options?: { value: string, display: string, disabled?: boolean }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ displayName, children, errorMessage, name, options, ...rest }: SelectProps, ref) => {
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{displayName}</label>
      <select
        ref={ref}
        {...rest}
        name={name}
      >
        {
          options && options.map((option) => {
            return (
              <option key={option.value} disabled={option?.disabled} value={option.value}>{option.display}</option>
            )
          })
        }
        {children}
      </select>
      {errorMessage ? <span className='error'>{errorMessage}</span> : <></>}
    </div>
  )
})

Select.displayName = "Select";

export default Select;
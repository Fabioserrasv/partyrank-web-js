'use client'
import React, { ReactNode, forwardRef } from 'react'
import './select.scss';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  displayName: string;
  name: string;
  errorMessage?: string;
  placeholder?: string;
  children?: ReactNode;
  options?: { value: string | number, display: string, disabled?: boolean }[];
  required?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ displayName, children, errorMessage, name, options, required, placeholder, ...rest }: SelectProps, ref) => {
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{displayName} {required ? <span className='required'>*</span> : <></>} {errorMessage ? <span className='error'>{errorMessage}</span> : <></>} </label>
      <select
        ref={ref}
        {...rest}
        name={name}
      >
        {placeholder && (
          <option value="" disabled hidden>{placeholder}</option>
        )}
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

Select.displayName = 'Select';

export { Select };

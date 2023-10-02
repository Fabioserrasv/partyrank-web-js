import React, { forwardRef } from 'react'
import './textarea.scss';

type InputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  displayName: string;
  name: string;
  errorMessage?: string;
  content: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(({ content, displayName, errorMessage, name, ...rest }: InputProps, ref) => {
  return (
    <div className='inputGroup'>
      <label htmlFor={name}>{displayName} {errorMessage ? <span className='error'>{errorMessage}</span> : <></>} </label>
      <textarea
        ref={ref}
        {...rest}
        autoComplete="off"
        name={name}
        value={content}
      >
      </textarea>
    </div>
  )
})
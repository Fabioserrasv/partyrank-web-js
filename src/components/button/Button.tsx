import { ReactNode } from 'react';
import './button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  name?: string;
  children?: React.ReactNode
  className?: string;
}
export function Button({ name, children, className = '', ...rest }: ButtonProps) {
  return(
    <button {...rest} className={`buttonComponent ${className}`}>
      {
        name ? name : <></>
      }
      {
        children ? children : <></>
      }
    </button>    
  )
}
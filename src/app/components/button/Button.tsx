import { ReactNode } from 'react';
import './button.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  name?: string;
  children?: React.ReactNode
}
export function Button({ name, children, ...rest }: ButtonProps) {
  return(
    <button {...rest}>
      {
        name ? name : <></>
      }
      {
        children ? children : <></>
      }
    </button>    
  )
}
import { ReactNode } from "react";
import { Csrf } from "../csrf";

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
}

export async function Form({ children, ...rest }: FormProps) {
  return(
    <form {...rest}>
      <Csrf />
      {children}
    </form>
  )
}
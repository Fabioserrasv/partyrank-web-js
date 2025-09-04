import { ReactNode } from "react";
import './card.scss';

type ModalProps = {
  children: ReactNode;
  size: "sm" | "md" | "lg";
}

export function Card({ children, size }: ModalProps) {
  return (
    <div className={`modal-login-1 ${size}`}>
      <div className="header"></div>
      <div className="body">
        {children}
      </div>
      <div className="footer"></div>
    </div>
  )
}
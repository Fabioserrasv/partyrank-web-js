import { ReactNode } from "react";
import './table.scss';

type TableContainerProps = {
  itens: any[],
  match: {
    elementKey: number | string;
    render: string[]
  }
}

type CellProps = {
  children: ReactNode
}

export function Table({ children }: CellProps) {
  return (
    <div className="table">
      {children}
    </div>
  )
}

export function TableRow({ children }: CellProps) {
  return (
    <div className="cell">
      {children}
    </div>
  )
}
import { ReactNode } from 'react';
import './modal.scss';
import { X } from 'lucide-react';

type ModalProps = {
  children: ReactNode;
  title: string;
  className: string;
  closeModal: (isModalOpen: boolean) => void;
}

export default function Modal({ title, children, className, closeModal }: ModalProps) {
  return (
    <div className="modal">
      <div className={`modalContainer ${className}`}>
        <div className="title">
          <h3>{title}</h3>
          <X className='iconClose' onClick={() => { closeModal(false) }} />
        </div>
        <div className="modalBody">
          {children}
        </div>
        <div className="modalFooter">
          
        </div>
      </div>
    </div>
  )
}
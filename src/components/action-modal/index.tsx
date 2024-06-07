'use client';
import { ReactNode, useState } from 'react';
import './action-modal.scss';
import { X } from 'lucide-react';
import Modal from '../modal';
import { LoadingComponent } from '../loading-component';
import { Button } from '../button/Button';

type ActionButton = {
  description: string;
  func: () => void;
  color: string;
}

type ActionModalProps = {
  title: string;
  className: string;
  closeModal: (isModalOpen: boolean) => void;
  firstButton: ActionButton;
  secondButton: ActionButton;
}

export default function ActionModal({ title, firstButton, secondButton, className, closeModal }: ActionModalProps) {
  const [isLoading, setIsLoadind] = useState<boolean>(false);

  return (
    <Modal
      title="Confirm Action"
      className="sm"
      closeModal={closeModal}
    >
      <span>{title}</span>

      <div className='actions-buttons'>
        <Button
          name={firstButton.description}
          onClick={() => { firstButton.func() }}
          className='first-button'
          // color={firstButton.color}
          style={{ backgroundColor: firstButton.color }}
          type='button'
        />

        <Button
          name={secondButton.description}
          onClick={() => { secondButton.func() }}
          style={{ backgroundColor: secondButton.color }}
          type='button'
        />
      </div>

      {isLoading && <LoadingComponent />}
    </Modal >
  )
}
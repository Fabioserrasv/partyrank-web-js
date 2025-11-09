'use client';
import { useState } from 'react';
import './confirm-delete-modal.scss';
import Modal from '../modal';
import { LoadingComponent } from '../loading-component';
import { Button } from '../button/Button';

type ConfirmDeleteModalProps = {
  title: string;
  message: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
  className?: string;
}

export default function ConfirmDeleteModal({ 
  title, 
  message, 
  onConfirm, 
  onCancel,
  className = 'sm'
}: ConfirmDeleteModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleConfirm() {
    setIsLoading(true);
    try {
      await onConfirm();
      onCancel();
    } catch (error) {
      console.error('Erro ao confirmar exclusão:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title={title}
      className={className}
      closeModal={onCancel}
      footer={false}
    >
      <div className="confirm-delete-content">
        <span className="confirm-delete-message">{message}</span>

        <div className='confirm-delete-buttons'>
          <Button
            name="No"
            onClick={onCancel}
            className='cancel-button'
            type='button'
            disabled={isLoading}
          />

          <Button
            name="Confirm"
            onClick={handleConfirm}
            className='confirm-button'
            type='button'
            disabled={isLoading}
            style={{ backgroundColor: '#dc3545' }}
          />
        </div>
      </div>

      {isLoading && <LoadingComponent />}
    </Modal>
  )
}


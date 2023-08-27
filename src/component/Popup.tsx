import React, { FC } from 'react';

interface PopupProps {
  show?: boolean;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

const Popup: FC<PopupProps> = ({ show, onClose, children }) => {
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation(); 
  };

  const preference = {
    modalOverlay: show
      ? 'fixed inset-0 flex items-center justify-center z-50'
      : 'hidden',
    modalContent: show
      ? 'bg-white p-4 rounded-md costum-shadow grid justify-items-center w-80 lg:w-[580px]'
      : 'hidden',
  };

  return (
    <div className={preference.modalOverlay} onClick={onClose}>
      <div className={preference.modalContent} onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
};

export default Popup;

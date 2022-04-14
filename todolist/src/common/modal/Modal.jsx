import React from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import * as Styled from 'common/modal/Modal.style';

let modalRoot = document.querySelector('#modal');

const Modal = ({
  open,
  isClosableDimmer,
  showCloseButton,
  onClose,
  children,
}) => {
  if (modalRoot === null) {
    // Note: 테스트(Jest)에서 modalRoot를 인식하지 못하는 문제해결
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
  }

  const handleMouseDownOverlay = ({ target, currentTarget }) => {
    if (isClosableDimmer && target === currentTarget) {
      onclose();
    }
  };

  return createPortal(
    <Styled.Overlay open={open} onMouseDown={handleMouseDownOverlay}>
      <Styled.Modal>
        {open && showCloseButton && (
          <Styled.CloseButton onClick={onClose}>
            <CloseIcon />
          </Styled.CloseButton>
        )}
        {open && children}
      </Styled.Modal>
    </Styled.Overlay>,
    modalRoot,
  );
};

export default Modal;

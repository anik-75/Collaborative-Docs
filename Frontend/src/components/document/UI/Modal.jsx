import React from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={() => onClose(false)}></div>;
};


const ModalOverlay = (props) => {
  return <div className={styles.modal}>{props.children}</div>;
};

function Modal({ children, onClose }) {
  return (
    <React.Fragment>
      {createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("portal")
      )}
      {createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById("portal")
      )}
    </React.Fragment>
  );
}

export default Modal;

import React from 'react';
import styles from './modal.scss';

const Modal = ({ name }) => (
  <>
    <div className={styles.title}>{name}</div>
  </>
);

export default Modal;

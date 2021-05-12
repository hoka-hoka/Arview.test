import React, { Component } from 'react';
import Button from './Button';
import Modal from './Modal';
import styles from './template.scss';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = { amountClick: 0 };
  }

  render() {
    const { amountClick } = this.state;
    return (
      <>
        <div className={styles.template}>
          <div className={styles.header}>
            <div className={styles.top}>
              <Button amountClick={amountClick} setData={this.state} />
            </div>
            <div className={styles.bottom}>
              <Modal name="title" />
              <Button />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Template;

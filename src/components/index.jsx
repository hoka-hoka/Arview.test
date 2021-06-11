import React, { Component } from 'react';
import ModalWindow from './ModalWindow';
import CreateEvent from './CreateEvent';

import { lang, langData, viewMode } from '../constants';

import './template.scss';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = { view: viewMode.main, eventType: '' };
  }

  updateState = ({ update } = {}) => {
    if (update) {
      return (params) => this.setState(params);
    }
    return this.state;
  };

  render() {
    return (
      <div className="">
        <ModalWindow
          title={`${lang[langData.add]} ${lang[langData.event]}`}
          render={() => <CreateEvent updateState={this.updateState} />}
        />
      </div>
    );
  }
}

export default Template;

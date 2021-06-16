import React, { Component } from 'react';
import Calendar from 'react-calendar';

import Sprite from '../common/Sprite';

import ModalWindow from './ModalWindow';
import Control from './Control';
import List from './List';

import { lang, langData, viewMode } from '../constants';

import '../scss/normalize.scss';
import './template.scss';
import 'react-calendar/dist/Calendar.css';

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: viewMode.main,
      eventData: [],
      selectedDate: new Date(),
      currentEvent: {},
    };
  }

  componentDidMount = () => {
    const history = window.history.state?.eventData || [];
    this.setState({ eventData: history });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { eventData } = this.state;
    if (prevState.eventData != eventData) {
      window.history.pushState({ eventData: eventData }, '', '');
    }
  };

  updateState = ({ update } = {}) => {
    if (update) {
      return (params) => this.setState(params);
    }
    return this.state;
  };

  showEvents = (value) => {
    this.setState({ selectedDate: value });
  };

  changeView = () => {
    this.setState({ view: viewMode.add });
  };

  render() {
    const { eventData, selectedDate, view, currentEvent } = this.state;
    return (
      <div className="widget">
        {view == viewMode.main && (
          <>
            <div className="widget__cont">
              <div className="widget__calendar">
                <Calendar onClickDay={this.showEvents} value={new Date()} />
                <button
                  className="widget__add"
                  onClick={this.changeView}
                  type="button"
                >
                  {lang[langData.add]}
                </button>
              </div>
              <div className="widget__events">
                <List
                  selectedDate={selectedDate}
                  eventData={eventData}
                  updateState={this.updateState}
                />
              </div>
            </div>
          </>
        )}

        {view == viewMode.add && (
          <ModalWindow
            title={`${lang[langData.add]} ${lang[langData.event]}`}
            eventData={eventData}
            currentEvent={currentEvent}
            updateState={this.updateState}
            render={(callback) => (
              <Control
                selectedDate={selectedDate}
                currentEvent={currentEvent}
                callback={callback}
              />
            )}
          />
        )}
        <Sprite />
      </div>
    );
  }
}

export default Template;

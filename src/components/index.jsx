import React, { Component } from 'react';
import Calendar from 'react-calendar';

import ModalWindow from './ModalWindow';
import CreateEvent from './CreateEvent';
import Events from './Events';

import { lang, langData, viewMode } from '../constants';

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
              </div>
              <div className="widget__events">
                <Events
                  selectedDate={selectedDate}
                  eventData={eventData}
                  updateState={this.updateState}
                />
              </div>
            </div>

            <button onClick={this.changeView} type="button">
              {lang[langData.add]}
            </button>
          </>
        )}

        {view == viewMode.add && (
          <ModalWindow
            title={`${lang[langData.add]} ${lang[langData.event]}`}
            eventData={eventData}
            view={view}
            currentEvent={currentEvent}
            updateState={this.updateState}
            render={(callback) => (
              <CreateEvent
                selectedDate={selectedDate}
                currentEvent={currentEvent}
                callback={callback}
              />
            )}
          />
        )}
      </div>
    );
  }
}

export default Template;

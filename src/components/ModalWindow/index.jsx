import React, { useEffect, useRef, useState } from 'react';
import { lang, langData, viewMode, eventList } from '../../constants';
import { interElems, focusArea } from './constants';
import './ModalWindow.scss';

const ModalWindow = ({
  title,
  eventData,
  render,
  currentEvent,
  updateState,
}) => {
  const [newEventData, setNewEventData] = useState({});
  const [errors, setErrors] = useState([]);

  const modal = useRef();
  const focusedElems = useRef([]);

  const addEventData = () => {
    updateState({ update: true })({ eventData: [...eventData, newEventData] });
  };

  const editEventData = () => {
    const { index } = currentEvent;
    const copyData = [...eventData];
    copyData.splice(index, 1, newEventData);
    updateState({ update: true })({ eventData: copyData });
  };

  const validationCheck = () => {
    const { type } = newEventData;
    const errorMap = eventList[type].fields.filter(
      (field) => !newEventData[field.name],
    );
    if (errorMap) {
      setErrors(errorMap);
      return false;
    }
    return true;
  };

  const saveEventData = () => {
    const isErrors = validationCheck();
    if (isErrors) {
      return;
    }
    updateState({ update: true })({ bubbling: true });
    if (!currentEvent?.obj) {
      addEventData();
    } else {
      editEventData();
    }
    updateState({ update: true })({ bubbling: false });
  };

  const comeBack = () => {
    updateState({ update: true })({
      view: viewMode.main,
      currentEvent: { index: undefined, obj: undefined },
    });
  };

  const defFocusPosition = () => {
    const findInteractElem = (elem) => {
      for (let i = 0; i < elem.length; i++) {
        const isInteractive = interElems.find(
          (tagName) => elem[i].nodeName == tagName,
        );
        if (isInteractive) {
          focusedElems.current.push(elem[i]);
        }
        if (elem[i].hasChildNodes()) {
          findInteractElem(elem[i].children);
        }
      }
    };
    const childrens = modal.current.children;
    if (!childrens) {
      return;
    }
    findInteractElem(childrens);
    if (focusedElems.current.length) {
      focusedElems.current[0].focus();
    }
  };

  const shiftFocusPosition = (event) => {
    const { target } = event;
    const elems = focusedElems.current;
    if (target.dataset.focused === focusArea.end) {
      elems[0].focus();
    }
    if (target.dataset.focused === focusArea.start) {
      elems[elems.length - 1].focus();
    }
  };

  useEffect(() => {
    defFocusPosition();
    document.addEventListener('click', (event) => {
      if (modal?.current && !modal.current.contains(event.target)) {
        comeBack();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.keyCode == 27) {
        comeBack();
      }
    });
  }, []);

  return (
    <>
      <div
        className="modal"
        role="dialog"
        aria-labelledby="dialog_label"
        aria-modal="true"
        ref={modal}
        onFocus={shiftFocusPosition}
      >
        <div data-focused="start" tabIndex="0" />
        <div className="modal__cont">
          <h2 className="modal__title" id="dialog_label">
            {title}
          </h2>
          <div className="modal__menu">
            {render(setNewEventData, errors)}

            <div className="modal__btns">
              <button className="modal__back" type="button" onClick={comeBack}>
                {lang[langData.cancel]}
              </button>
              <button
                className="modal__save"
                type="button"
                onClick={saveEventData}
              >
                {lang[langData.save]}
              </button>
            </div>
          </div>
        </div>
        <div data-focused="end" tabIndex="0" />
      </div>
      <div className="modal__overley" />
    </>
  );
};

ModalWindow.defaultProps = {
  title: '',
  persons: [],
  render: (f) => f,
  updateState: (f) => f,
  getData: (f) => f,
};

export default ModalWindow;

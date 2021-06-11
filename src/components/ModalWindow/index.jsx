import React, { useEffect, useRef, useState } from 'react';
import { lang, langData, viewMode } from '../../constants';
import { interElems, focusArea } from './constants';
import './ModalWindow.scss';

const ModalWindow = ({
  title,
  view,
  persons,
  render,
  updateState,
  getData,
}) => {
  const [fieldData, setFieldData] = useState({
    firstName: '',
    lastName: '',
    id: 0,
  });

  const modal = useRef();
  const focusedElems = useRef([]);

  const addPerson = () => {
    const { firstName, lastName } = fieldData;
    const data = {
      firstName,
      lastName,
      image: 'img/ava.png',
    };
    getData('persons', data).then((resp) => {
      if (!resp?.success) {
        updateState({ update: false }).notice = {
          ...{
            error: true,
            message: lang[langData.empError],
          },
        };
      } else {
        persons.push(resp.d);
        updateState({ update: false }).notice = {
          ...{
            error: false,
            message: lang[langData.createEmp],
          },
        };
      }
      updateState({ update: true })({ bubbling: true });
    });
  };

  const enrichPerson = () => {
    const { firstName, lastName, id } = fieldData;
    if (!id) {
      return;
    }
    const data = {
      id: id,
      firstName,
      lastName,
      image: 'img/ava.png',
    };
    getData('persons', data).then((resp) => {
      if (!resp?.success) {
        updateState({ update: false }).notice = {
          ...{
            error: true,
            message: lang[langData.fillingError],
          },
        };
      } else {
        updateState({ update: false }).notice = {
          ...{
            error: false,
            message: lang[langData.update],
          },
        };
      }
      updateState({ update: true })({ bubbling: true });
    });

    const foundFieldIndex = persons.findIndex((field) => field.id == id);
    if (~foundFieldIndex) {
      const editField = persons[foundFieldIndex];
      persons[foundFieldIndex] = { ...editField, firstName, lastName };
    }
  };

  const savePerson = () => {
    // const { firstName, lastName } = fieldData;
    // const isFilled = firstName && lastName;
    // if (!isFilled) {
    //   updateState({ update: false }).notice = {
    //     ...{
    //       error: true,
    //       message: lang[langData.fillingError],
    //     },
    //   };
    //   updateState({ update: true })({ bubbling: true });
    // } else {
    //   switch (view) {
    //     case viewMode.add:
    //       addPerson();
    //       break;
    //     case viewMode.edit:
    //       enrichPerson();
    //       break;
    //     default:
    //       break;
    //   }
    // }
  };

  const comeBack = () => {
    updateState({ update: true })({ view: viewMode.list });
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
            {render(setFieldData)}

            <div className="modal__btn">
              <button className="modal__back" type="button" onClick={comeBack}>
                {lang[langData.cancel]}
              </button>
              <button
                className="modal__save"
                type="button"
                onClick={savePerson}
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
  view: viewMode.load,
  persons: [],
  render: (f) => f,
  updateState: (f) => f,
  getData: (f) => f,
};

export default ModalWindow;

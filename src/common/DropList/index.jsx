import React, { useState, useEffect, useRef } from 'react';
import './DropList.scss';

const DropList = ({
  optNames,
  extClass,
  placeHolder,
  listActive,
  callback,
}) => {
  const [active, setActive] = useState(listActive);
  const [curOption, setCurOption] = useState({
    val: '',
    index: null,
  });
  const par = useRef();

  useEffect(() => {
    if (!active) {
      callback(curOption.index);
    }
  }, [active]);

  const handlerBlur = () => {
    setTimeout(() => {
      const $elem = $(document.activeElement);
      const $focused = $(par.current);
      if (!$focused.is($elem) && !$focused.find($elem).length) {
        setActive(false);
      }
    });
  };

  const handlerKeyPress = (event) => {
    event.stopPropagation();
    const keyCode = event.keyCode || event.charCode;
    if (![32, 13].includes(keyCode)) return;
    setActive((prevState) => ({
      active: !prevState,
    }));
  };

  const rasingFocus = (elem) => {
    const $focused = $(elem).parent();
    setTimeout(() => {
      $focused.focus();
    });
  };

  const handlerClick = ({ target }) => {
    if (!optNames.length) {
      return;
    }
    setActive((prevState) => !prevState);
    rasingFocus(target);
  };

  const selectOption = (event, i) => {
    event.stopPropagation();
    const { type } = event;
    if (type === 'keydown') {
      const keyCode = event.keyCode || event.charCode;
      if (![32, 13].includes(keyCode)) return;
    }
    setActive(false);
  };

  const changeActiveOption = ({ target }, i) => {
    setCurOption({ val: target.innerHTML, index: i });
  };

  const defaultFocusOption = (el, i) => {
    if (!el || curOption.index != i) {
      return;
    }
    // console.log(document.activeElement);

    // el.focus();
  };

  return (
    <div
      ref={par}
      className={`drop-list${extClass ?? ''}${
        active ? ' drop-list_active' : ''
      }`}
      tabIndex="0"
      onBlur={handlerBlur}
      onKeyPress={handlerKeyPress}
      role="button"
      aria-expanded={active}
      aria-haspopup="true"
    >
      <input
        className="drop-list__field"
        type="text"
        onClick={handlerClick}
        placeholder={placeHolder}
        tabIndex="-1"
        value={curOption.val}
        readOnly
        aria-hidden
      />
      <button
        className="drop-list__btn"
        type="button"
        onClick={handlerClick}
        tabIndex="-1"
        aria-hidden
      />
      {active && (
        <div className="drop-list__panel">
          {optNames.map((item, i) => (
            <div
              ref={(el) => defaultFocusOption(el, i)}
              className={`drop-list__item${
                i == curOption.index ? ' drop-list__item_focused' : ''
              }`}
              onClick={(event) => selectOption(event, i)}
              onKeyPress={(event) => selectOption(event, i)}
              onFocus={(event) => changeActiveOption(event, i)}
              key={i}
              tabIndex={-1}
              role="button"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DropList.defaultProps = {
  callback: (f) => f,
  optNames: [],
  placeHolder: '',
  listActive: false,
};

export default DropList;

const lang = [
  'Отмена',
  'Сохранить',
  'Добавить',
  'Событие',
  'Название события',
  'Тип события',
  'Мероприятия',
  'Куда идти',
  'Во соклько',
  'Праздничные дни',
  'Сумма денег',
  'Пометки / Другое',
];

const langData = {
  cancel: 0,
  save: 1,
  add: 2,
  event: 3,
  eventName: 4,
  eventType: 5,
  events: 6,
  adddress: 7,
  time: 8,
  holiday: 9,
  money: 10,
  marks: 11,
};

const viewMode = {
  none: 'none',
  load: 'load',
  main: 'main',
  add: 'add',
  edit: 'edit',
};

const dropList = {
  names: ['Праздничные дни', 'Мероприятия', 'Пометки / Другое'],
};

const events = [
  {
    id: 1,
    name: 'holiday',
    fields: [{
      name: 'price',
      text: lang[langData.money],
      type: 'number',
    }]
  },
  {
    id: 2,
    name: 'party',
    fields: [
      {
        name: 'adddress',
        text: lang[langData.adddress],
        type: 'text',
      }, {
        name: 'time',
        text: lang[langData.time],
        type: 'text'
      } 
    ]
  }, {
    id: 3,
    name: 'mark',
    fields: [
      {
        name: 'marks',
        text: lang[langData.marks],
        type: 'text'
      }
    ]
  }
]

export { lang, langData, viewMode, dropList, events };

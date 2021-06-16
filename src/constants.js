const lang = [
  'Отмена',
  'Сохранить',
  'Добавить',
  'Событие',
  'Название события',
  'Тип события',
  'Мероприятия',
  'Куда идти?',
  'Во соклько?',
  'Праздничные дни',
  'Сумма денег',
  'Пометки / Другое',
  'Бюджет',
  'Адрес',
  'Время',
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
  whatTime: 8,
  holiday: 9,
  money: 10,
  marks: 11,
  budget: 12,
  address: 13,
  time: 14,
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

const eventList = [
  {
    id: 1,
    name: 'holiday',
    fields: [{
      name: 'price',
      text: lang[langData.money],
      type: 'number',
      about: lang[langData.budget],
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
        about: lang[langData.address],
      }, {
        name: 'time',
        text: lang[langData.whatTime],
        type: 'text',
        about: lang[langData.time],
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

export { lang, langData, viewMode, dropList, eventList };

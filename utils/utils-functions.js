const utilsFunctions = {
  getRandomNumber: (min, max) => Math.floor(Math.random() * (max - min) + min),
  getRandFromArr: (arr) => {
    const index = utilsFunctions.getRandomNumber(0, arr.length);
    return arr[index];
  },

};
const returnRandomData = () => {
  const data = {};
  data.names = utilsFunctions.getRandFromArr(RATING_LIST.names);
  data.ratings = utilsFunctions.getRandFromArr(RATING_LIST.ratings);
  return data;
};

// Замечания по стилю - отсутствует пробел после переменной utilsFunctions, однако, есть лишний пробел внутри, - после функции getRandFromArr

// Для выбора случайного элемента из массива можно упростить метод, для этого необходимо использовать функции Math.random и Math.floor, итоговая конструкция будет выглядеть примерно следующим образом - const item = items[Math.floor(Math.random() * items.length)]

// Данные утилитарные функции можно упразднить и перенести логику непосредственно в объект с тестовыми данными в файле Mock.js.

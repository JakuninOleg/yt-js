class Person extends Component {
    constructor(name) {
        super();
        this.name = name;
        this._happiness = 0;
        this._valueElement = document.querySelector(`.column__value-name`);
        this._iconElement = document.querySelector(`.column__value-icon`);
    }

    // Ненужное сокрытие, отсутствие сеттеров и геттеров, подробнее описано в других файлах

    hasCat() {
        return this._happiness++;
    }

    hasRest() {
        return this._happiness++;
    }

    hasMoney() {
        return this._happiness++;
    }

    // В данных методах необязательно возвращать результат выполнения функции. Логику повышения уровня счастья стоит вынести в отдельный метод и вызывать уже его внутри данных методов, что позволит нам соблюдать принцип DRY

    isSunny() {
        const APIKey = '28c7d687accc7c75aabbc7fb71173feb';
        const city = 'Москва';
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIKey;

        return fetch(url)
            .then(res => res.json())
            .then((res) => {
              console.log(this._happiness);
                if (res.main.temp - 273 > 15) {
                    return this._happiness++;
                }

            });
      }

}

// Замечания по стилю - оступы(4 вместо 2), пробелы внутри класса между методами

// Логику fetch стоит вынести в отдельный метод вне данного контекста, т.к. не совсем логично объявлять его внутри класса Person. При получении promise - мы уже можем манпулировать настроением экземпляра класса Person в данном месте. Не убрано выражение console.log, что выведет в консоль уровень счастья. Ключи апи и прочие переменные стоит хранить в отдельном файле и подключать в нужных местах.

// Неверная обработка полученных данных в fetch. Если температура не соответсвует условию  res.main.temp - 273 > 15 - в script передастся значение undefined и программа будет неверно возвращать иконку

// Для того, чтобы избежать ловушки с callback hell (http://callbackhell.ru/) и писать более чистый код - советую обратить внимание на конструкцию async await - https://learn.javascript.ru/async-await

// Метод fetch поддерживает не всеми старыми браузерами, потому стоит обратить внимание на библиотеку axios - https://github.com/axios/axios

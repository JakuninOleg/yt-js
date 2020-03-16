class Form extends Component {
    constructor() {
        super();
        this._element = null;

        this._onSubmit = this._onSubmit.bind(this);
        // В чем смысл объявления данной переменной и привязки через bind, данная конструкция непонятна. Метод сабмит формы можно объявить отдельно и выполнять в нем необходммую логику
    }

    setEventListener() {
      this._submit = this._element.querySelector(`.columns__submit`);
      this._submit.addEventListener(`click`, this._onSubmit);
    }

    // Функция setEventListener должна соответствовать названию и добавлять привязку события. Здесь же первым действием выбирается элемент для которого это событие впоследствии привязывается. Необходимо разделить логику, как вариант - перенести переменную submit в конструктор класса.

    get template() {
        return `<form>
                    <h1 class="column__title">
                        Введите данные
                    </h1>
                    <h2 class="column__heading">
                        Имя?
                    </h2>
                    <input type="text" name="name">
                    <h2 class="column__heading">
                        Есть кот?
                    </h2>
                    <label class="column__label">
                        <input type="radio" value="yes" name="cat">
                        <span>Да</span>
                    </label>
                    <label class="column__label">
                        <input type="radio" value="no" name="cat">
                        <span>Нет</span>
                    </label>
                    <h2 class="column__heading">Отдыхал недавно?</h2>
                    <label class="column__label">
                        <input type="radio" value="yes" name="rest">
                        <span>Да</span>
                    </label>
                    <label class="column__label">
                        <input type="radio" value="no" name="rest">
                        <span>Нет</span>
                    </label>
                    <h2 class="column__heading">Денег ок?</h2>
                    <label  class="column__label">
                        <input type="radio" value="yes" name="money">
                        <span>Да</span>
                    </label>
                    <label class="column__label">
                        <input type="radio" value="no" name="money">
                        <span>Нет</span>
                    </label>
                    <button class="columns__submit">
                        HAPPINESS RATE
                    </button>
		    	</form>`.trim();
    }

    set onSubmit(fn) {
        this._onSubmit = fn;
    }
    _onSubmit(evt) {
        evt.preventDefault();
        return typeof this._onSubmit === `function` && this._onSubmit(evt);
    }
    // Данная функция предотвращает перезагрузку страницы и возвращает булевое значение - не совсем ясна логика. Ошибка в названии функции - нижнее подчеркивание перед названием. В целом - не ясна логика объявления сеттера и еще одной функции с дублирующим названием.
    removeEventListener() {
        this._submit.removeEventListener(`click`, this._onSubmit);
    }
}

// Замечания стиля - отсутствую пробелы между методами и переменными внутри класса, в теле функци сделано 4 отступа вместо 2х.

// Данный класс можно значительно упростить и привести в более понятынй и читаемый вид, соответствующий стандартам ООП


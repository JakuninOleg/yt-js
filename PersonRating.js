class PersonRating extends Component {
  constructor(data) {
    super(data);
    this._names = data.names;
    this._ratings = data.ratings;
  }
  get template() {
    return `<article class="columns__rating-item">
      <h3 class="columns__rating-title">${this._names}</h3>
      <span class="columns__rating-count">${this._ratings}</span>`.trim();
  }
}

// Ошибки стиля - отсутствие пустых строк внутри класса

// Конструктор класса принимает аргумент data и получает его же из родительского класса что является логической ошибкой. Более того, в родительском классе аргумент data отсутствует.

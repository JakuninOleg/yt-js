window.onload = () => {
  const FORM_WRAPPER = document.querySelector(`.column_type_input`);
  // Несоответствующее стилю название переменной
	const ratingArray = [];
	let countedRating = 20;


  const renderSearch = (allItemsData) => {
    PageEnum.SiteWrapper.SEARCH.innerHTML = ``;
    // Из-за структуры тестовых данных очень сложно обращаться и читать подобный код, потому стоит уделить внимание верной организации

    const searchComponent = new Search();

    PageEnum.SiteWrapper.SEARCH.appendChild(searchComponent.render());
    // Чтобы постоянно не писать PageEnum.SiteWrapper.SEARCH - имеет смысл привязать данное обращение к переменной, либо верно структурировать тестовые данные (и не только их  :) )

    searchComponent.onChange = (value) => {
      const filteredItems = allItemsData.filter((currentItem) => currentItem._names.includes(value));
      // Здесь и в других местах - обращение к сокрытым переменным напрямую, это стоит делать через геттеры, если есть необходимость использовать сокрытие
      PageEnum.SiteWrapper.rating.innerHTML = ``;
      if (value === ``) {
        ratingRender(countedRating, allItemsData);
      } else {
        ratingUpdate(filteredItems);
      }
    };
  };

  const ratingRender = (ratingAmount, ratingArray) => {
    for (let i = 0; i < ratingAmount; i++) {
      ratingArray[i] = new PersonRating(returnRandomData());
      // Данный метод создаст 20 экземпляров класса PersonRating. Возможно, можно было не создавать отдельный класс для данного функционала и прибегнуть к верному объявлению тестовых данных и возвращению одного компонента со списком всех рейтингов.
    }
    ratingUpdate(ratingArray);
  };

  const ratingUpdate = (ratingArray) => {
    ratingArray.forEach((item) => {
      PageEnum.SiteWrapper.rating.appendChild(item.render());
    });
    if (ratingArray.length === 0) {
      PageEnum.SiteWrapper.rating.innerHTML = `Rating list is empty`
    }
    // Проверка на длинну массива идет после его, обработки, тут логично использовать конструкцию if ... else
  };

	const renderForm = () => {
		const formComponent = new Form();
		FORM_WRAPPER.appendChild(formComponent.render());

		formComponent.onSubmit = (evt) => {
      evt.preventDefault();
      // preventDeafault уже вызывался внутри класса Form
      // В данном случае событие - клик мышкой, а не отправка формы
			const name = document.querySelector(`input[name=name]`).value;
			const cat = document.querySelector(`input[name=cat]`).value;
			const rest = document.querySelector(`input[name=rest]`).value;
      const money = document.querySelector(`input[name=money]`).value;
      // Подобные переменные стоит объявлять в начале файла, либо в отдельном файле и импортировать их (в том числе используя деструтуризацию)
      // Не работают радио инпуты из-за неверного к ним обращения через name. Т.к. в обоих случаях html элементы идиентичны - выбирается всегды первый с value = yes, соответственно - выбор пользователя ни на что не влияет. Необходимо проверять аттрибут checked у радио кнопок.
			const Man = new Person(name);
			if (cat === 'yes') {
				Man.hasCat();
			}
			if (rest === 'yes') {
				Man.hasRest();
			}
			if (money === 'yes') {
				Man.hasMoney();
      }
      // Данные методы выглядят громоздко, есть возможность переписать их, используя конструкуцию case, более того - логику можно вынести в класс Person, соблюдая принцип DRY
			Man.isSunny()
				.then((happiness) => {
          Man._valueElement.innerHTML = name;
          // Изменение имени в компоненте Person внутри работы с Promise - выбрано неверное местоположение для данной логики
          console.log(happiness)
					if (happiness === 4) {
						Man._iconElement.innerHTML = '😆';
					} else if (happiness === 3 || happiness === 2) {
						Man._iconElement.innerHTML = '😐';
					} else {
						Man._iconElement.innerHTML = '☹️';
					}
				});
		}
	};

	renderForm();
  renderSearch(ratingArray);
	ratingRender(countedRating, ratingArray);
};


// На данном этапе код ПО очень сложен для восприятия. Возможно, стоило использовать MVC паттерн и разделить функционал на соответсвующие разделы и функции. (если студент проходил MVC тему)

// Не используются модули (export, import) что могло бы упростить взаймодействие классов и методов друг с другом, а в html файле импортировать только один файл

// Не работают радио инпуты, в следствии чего смысл ПО теряется в виду неработоспосбности основного фукционала

// Методы слишком большие и громоздкие, стоит разделить их на более компактные и понятные для чтения

// В классах повторяются методы, объявленные в родительском классе - что противоречит логике насследования в ООП

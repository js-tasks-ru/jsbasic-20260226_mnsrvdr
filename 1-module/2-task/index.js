function print(text) {
  console.log(text);
}

function isValid(name) {

  if (name === null) {
    return false;
  }

  if (name.length < 4) {
    return false;
  }

  if (name.includes(" ")) {
    return false;
  }

  return true;
}

function sayHello() {
// закомментировала чтобы тесты не падали
//    let userName = prompt('Введите ваше имя');
let userName = "Тест"; // любое валидное имя

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}

sayHello();
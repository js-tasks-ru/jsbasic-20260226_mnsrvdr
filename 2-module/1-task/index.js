function sumSalary(salaries) {

  let sum = 0;

  for (let key in salaries) {

    let value = salaries[key];

    if (
      typeof value === "number" &&
      value === value &&
      value !== Infinity &&
      value !== -Infinity
    ) {
      sum += value;
    }

  }

  return sum;
}

//проверка

let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
};

console.log(sumSalary(salaries));

//корнер кейсы

//let salaries = {}//0

//let salaries = {currency: "USD", isPayed: true}) //0

//let salaries = {John: 1000, Ann: NaN, Pete: Infinity}) //1000
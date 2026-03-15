function showSalary(users, age) {
  return users
    .filter(user => user.age <= age)
    .map(user => `${user.name}, ${user.balance}`)
    .join('\n');
}

// Пример использования:
let users = [
  {
    "balance": "$1,825.65",
    "age": 21,
    "name": "Golden Branch"
  },
  {
    "balance": "$1,490.15",
    "age": 25,
    "name": "Duncan Randall"
  },
  {
    "balance": "$2,500.00",
    "age": 30,
    "name": "Alice Cooper"
  }
];

console.log(showSalary(users, 25));
/* Вывод:
Golden Branch, $1,825.65
Duncan Randall, $1,490.15
*/
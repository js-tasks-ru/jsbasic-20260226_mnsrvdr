function ucFirst(str) {

  if (str === '') {
    return '';
  }

  return str[0].toUpperCase() + str.slice(1);
}

console.log(ucFirst('вася')); // Вася
console.log(ucFirst('в'));    // В
console.log(ucFirst(''));
console.log(ucFirst('Вася')); // Вася
console.log(ucFirst('вася123')); // Вася123
console.log(ucFirst('вася!')); // Вася!
console.log(ucFirst('вася?')); // Вася?
console.log(ucFirst('вася.')); // Вася.
console.log(ucFirst('вася,')); // Вася,
console.log(ucFirst('даша ')); // Даша 
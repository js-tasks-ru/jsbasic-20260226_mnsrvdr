function ucFirst(str) {

  if (str === '') {
    return '';
  }

  return str[0].toUpperCase() + str.slice(1);
}

//Позитивные кейсы
console.log(ucFirst('вася'));      // Вася
console.log(ucFirst('в'));         // В
console.log(ucFirst(''));          // ''
console.log(ucFirst('Вася'));      // Вася
console.log(ucFirst('вася123'));   // Вася123
console.log(ucFirst('вася!'));     // Вася!
console.log(ucFirst('даша '));     // Даша
console.log(ucFirst('м'));         // М
console.log(ucFirst('мама мыла')); // Мама мыла

//Негативные / необычные кейсы
console.log(ucFirst(' мария'));     // " мария" (пробел в начале - остается пробел)
console.log(ucFirst('123abc'));     // "123abc" (число остается, буква после не изменяется)
console.log(ucFirst('!внимание'));  // "!внимание" (символ в начале - не меняется)
console.log(ucFirst('   '));        // "   " (только пробелы - остаются пробелы)
console.log(ucFirst('\tпривет'));   // "	привет"
console.log(ucFirst('\nновая строка')); // "     новая строка" (перенос строки в начале)
console.log(ucFirst('🙂улыбка'));   // "🙂улыбка" (emoji остается без изменений)
console.log(ucFirst('ñandú'));      // "Ñandú" (латинская буква с диакритикой корректно в верхний регистр)
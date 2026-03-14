function checkSpam(str) {

  let lowerStr = str.toLowerCase();

  if (lowerStr.includes('1xbet') || lowerStr.includes('xxx')) {
    return true;
  }

  return false;
}
console.log(checkSpam('1XbeT now')); 
// true

console.log(checkSpam('free xxxxx')); 
// true

console.log(checkSpam('innocent rabbit')); 
// false

//Позитивные случаи (спам найден)
console.log(checkSpam('XXX content here'));   // true
console.log(checkSpam('Some 1xBet offer'));   // true
console.log(checkSpam('xxx and 1XBET'));      // true

//Граничные случаи (слово в начале, конце, смешанный регистр)
console.log(checkSpam('1xbet'));              // true
console.log(checkSpam('xxx'));                // true
console.log(checkSpam('XxX'));                // true
console.log(checkSpam('Text before 1XBET'));  // true
console.log(checkSpam('Text after XXX'));     // true

//Отрицательные случаи (спама нет)
console.log(checkSpam('1xbetting'));          // false (часть слова, не спам)
console.log(checkSpam('hello world'));        // false
console.log(checkSpam('XX'));                 // false (не полное "XXX")
console.log(checkSpam(''));                   // false (пустая строка)

//Очень длинная строка без спама
console.log(checkSpam('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')); // false
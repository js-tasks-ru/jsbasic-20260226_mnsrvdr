function truncate(str, maxlength) {

  if (str.length > maxlength) {
    return str.slice(0, maxlength - 1) + "…";
  }

  return str;
}

//console.log(truncate('Вот, что мне хотелось бы сказать на эту тему:', 20));
// Вот, что мне хотело…

//console.log(truncate('Всем привет!', 20));
// Всем привет!

//Позитивные случаи
//console.log(truncate("Привет", 10));         // "Привет"
//console.log(truncate("JavaScript", 10));     // "JavaScript"

//На границе (строка длиннее лимита на 1 символ)
//console.log(truncate("12345", 4));           // "123…"
//console.log(truncate("abcd", 3));            // "ab…"

//Немного за границей (строка на 2–3 символа больше лимита)
//console.log(truncate("abcdef", 4));          // "abc…"
//console.log(truncate("1234567", 5));         // "1234…"

//Сильно за границей (очень длинные строки)
//console.log(truncate("Lorem ipsum dolor sit amet", 10)); // "Lorem ips…"
//console.log(truncate("Очень длинная строка для теста", 15)); // "Очень длинная …"

//Граничные и маленькие лимиты
//console.log(truncate("Привет", 1));          // "…"
//console.log(truncate("A", 1));               // "A"
//console.log(truncate("AB", 1));              // "…"
//console.log(truncate("", 0));                // ""

//Строка с пробелами
//console.log(truncate("  JavaScript  ", 5));  // "  Ja…"
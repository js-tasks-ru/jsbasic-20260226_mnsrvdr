function camelize(str) {
  return str
    .split('-')
    .map((word, index) => 
      index === 0 
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}

// Примеры:
console.log(camelize('background-color')); // backgroundColor
console.log(camelize('list-style-image')); // listStyleImage
console.log(camelize('-webkit-transition')); // WebkitTransition
function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  const fragment = document.createDocumentFragment();

  friends.forEach(({firstName, lastName}) => {
    const li = document.createElement('li');
    li.textContent = `${firstName} ${lastName}`;
    fragment.appendChild(li);
  });

  ul.appendChild(fragment);
  return ul;
}
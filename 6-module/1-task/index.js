class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Имя', 'Возраст', 'Зарплата', 'Город', ''].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    this.elem.appendChild(thead);

    const tbody = document.createElement('tbody');
    this.elem.appendChild(tbody);

    rows.forEach(row => {
      const tr = document.createElement('tr');

      Object.values(row).forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });

      const tdButton = document.createElement('td');
      const btn = document.createElement('button');
      btn.textContent = 'X';
      btn.addEventListener('click', () => tr.remove());
      tdButton.appendChild(btn);
      tr.appendChild(tdButton);

      tbody.appendChild(tr);
    });
  }
}

let rows = [
  { name: 'Ilia', age: 25, salary: 1000, city: 'Petrozavodsk' },
  { name: 'Vasya', age: 14, salary: 1500, city: 'Moscow' },
  { name: 'Ivan', age: 22, salary: 100, city: 'Bryansk' },
  { name: 'Petya', age: 45, salary: 990, city: 'Chita' }
];

let table = new UserTable(rows);
document.body.appendChild(table.elem);
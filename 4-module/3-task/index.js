function highlight(table) {
  // Получаем все строки tbody
  const rows = table.tBodies[0].rows;

  for (let row of rows) {
    const cells = row.cells;

    // Status (последняя ячейка)
    const statusCell = cells[cells.length - 1];
    const available = statusCell.getAttribute('data-available');

    if (available === 'true') {
      row.classList.add('available');
    } else if (available === 'false') {
      row.classList.add('unavailable');
    } else {
      row.hidden = true;
    }

    // Gender (третья ячейка)
    const genderCell = cells[2];
    if (genderCell.textContent === 'm') {
      row.classList.add('male');
    } else if (genderCell.textContent === 'f') {
      row.classList.add('female');
    }

    // Age (вторая ячейка)
    const ageCell = cells[1];
    const age = parseInt(ageCell.textContent, 10);
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}
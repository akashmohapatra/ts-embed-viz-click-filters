export function updateFilterDisplay(filters) {
  const filterDisplay = document.querySelector('.filter-items');
  let content = '';
  filters.forEach((item, idx) => {
    let valuePills = '';
    item.values.forEach((item) => {
      valuePills += `<span class="pill">${item}</span>`;
    });
    content += `
    <span class="filter-pill">
      <span class="filter-pill-heading" data-index=${idx}>
        <span>${item.columnName}</span>
        <span onclick="removeFilter(this);">&times;</span>
      </span>
      <span class="filter-pill-values">
        ${valuePills}
      </span>
    </span>`;
  });
  filterDisplay.innerHTML = content;
  if (filters.length > 0) {
    document.querySelector('.filter-footer').style.display = 'block';
  } else {
    document.querySelector('.filter-footer').style.display = 'none';
  }
}

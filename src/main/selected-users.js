export function getSelectedUsers() {
  const selectedCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  return Array.from(selectedCheckboxes).map((checkbox) =>
    checkbox.getAttribute('data-email')
  );
}

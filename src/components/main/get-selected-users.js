export const getSelectedUsers = () => {
  const selectedCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  return Array.from(selectedCheckboxes)
    .filter((checkbox) => checkbox.className !== "select-all")
    .map((checkbox) => checkbox.getAttribute("data-email"));
};

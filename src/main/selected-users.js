export class SelectedUsers {
  #selectedUsers = [];
  updateSelectedUsers(email, isSelected) {
    if (isSelected) {
      this.#selectedUsers.push(email);
    } else {
      this.#selectedUsers = this.#selectedUsers.filter(
        (userEmail) => userEmail !== email
      );
    }
  }
  getSelectedUsers() {
    return this.#selectedUsers;
  }
}

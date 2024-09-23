export function updateNavButtons(isUserLoggedIn) {
  const loginButton = document.querySelector('.login-button');
  const logoutButton = document.querySelector('.logout-button');
  if (isUserLoggedIn === true) {
    loginButton.classList.remove('d-block');
    loginButton.classList.add('d-none');
    logoutButton.classList.remove('d-none');
    logoutButton.classList.add('d-block');
  } else {
    loginButton.classList.remove('d-none');
    loginButton.classList.add('d-block');
    logoutButton.classList.remove('d-block');
    logoutButton.classList.add('d-none');
  }
}

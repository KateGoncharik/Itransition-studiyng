export const updateNavButtons = (isUserLoggedIn) => {
  const loginButton = document.querySelector(".login-button");
  const registrationButton = document.querySelector(".registration-button");
  const logoutButton = document.querySelector(".logout-button");
  if (isUserLoggedIn === true) {
    registrationButton.classList.remove("d-block");
    registrationButton.classList.add("d-none");
    loginButton.classList.remove("d-block");
    loginButton.classList.add("d-none");
    logoutButton.classList.remove("d-none");
    logoutButton.classList.add("d-block");
    return;
  }
  registrationButton.classList.add("d-block");
  registrationButton.classList.remove("d-none");
  loginButton.classList.remove("d-none");
  loginButton.classList.add("d-block");
  logoutButton.classList.remove("d-block");
  logoutButton.classList.add("d-none");
};

import { Component } from '../../../component.js';
import { auth } from '../../../firebase-config.js';

const createNavButtons = () => {
  const loginButton = new Component({
    tag: 'button',
    className: 'nav-item nav-link  login-button d-none',
    text: 'login',
  });
  const logoutButton = new Component({
    tag: 'button',
    className: ' logout-button btn btn-primary d-none',
    text: 'logout',
  });
  logoutButton.addListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });
  return [loginButton, logoutButton];
};

export const nav = new Component(
  {
    tag: 'nav',
    className: 'navbar bg-light p-2 mt-0 m-1',
  },
  new Component({ tag: 'h3', className: 'main-title' }),
  ...createNavButtons()
);

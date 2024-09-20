import { Component } from '../../component.js';
import { createMenu } from './menu.js';

export const createMainPage = () => {
  const container = document.querySelector('.page-content');
  container.innerHTML = '';
  const a = new Component(
    { className: 'main-page-container contained-fluid' },
    createMenu(),
    new Component({ className: 'table-container' })
  );
  container.appendChild(a.getNode());
};

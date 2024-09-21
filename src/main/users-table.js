import { Component } from '../../component.js';

class TableComponent extends Component {
  constructor({ headers = [], users = [] }) {
    super({ tag: 'table', className: ' table user-table' });
    const thead = new Component({ tag: 'thead' });
    const headerRow = new Component({ tag: 'tr' });

    const selectAll = new Component({
      tag: 'input',
      className: 'select-all',
    });
    selectAll.setAttribute('type', 'checkbox');
    const selectAllLabel = new Component({ tag: 'label' }, selectAll);

    selectAll.addListener('change', () => {
      const selectAllCheckbox = document.querySelector('.select-all');
      const checkboxes = document.querySelectorAll(
        'input[type="checkbox"]:not(.select-all)'
      );

      checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAllCheckbox.checked;
      });
    });
    headerRow.append(selectAllLabel);

    headers.forEach((headerText) => {
      const th = new Component({ tag: 'th', text: headerText });
      headerRow.append(th);
    });

    thead.append(headerRow);
    this.append(thead);

    const tbody = new Component({ tag: 'tbody', className: 'userTableBody' });
    users.forEach((user) => {
      const row = this.createUserRow(user);
      tbody.append(row);
    });

    this.append(tbody);
  }

  createUserRow(user) {
    const row = new Component({ tag: 'tr' });

    const checkboxCell = new Component({ tag: 'td' });
    const checkbox = new Component({ tag: 'input' });
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('data-email', user.data().email);

    checkboxCell.append(checkbox);
    const emailCell = new Component({ tag: 'td', text: user.data().email });
    const statusCell = new Component({ tag: 'td', text: user.data().status });

    const lastLogin = user.data().lastLogin
      ? new Date(user.data().lastLogin.seconds * 1000).toLocaleString()
      : 'N/A';
    const lastLoginCell = new Component({ tag: 'td', text: lastLogin });

    row.appendChildren([checkboxCell, emailCell, lastLoginCell, statusCell]);

    return row;
  }
}

export function renderUserTable(users) {
  const container = document.querySelector('.table-container');

  const headers = ['Email', 'Last Login', 'Status'];
  const userTable = new TableComponent({ headers, users });

  container.innerHTML = '';
  container.appendChild(userTable.getNode());
}

<a name="readme-top"></a>

<div align="center">
  <h1 align="center">Task 4</h1>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technology-stack">Technology stack</a></li>
      </ul>
    </li>
    </li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

_Completed: September 2024_

For this and other tasks you can check out the [MindMap](https://miro.com/app/board/uXjVKXt043k=/?share_link_id=575629632634).

Here is the [video demonstration](hh) of the result.

### Task description

- JavaScript или TypeScript, React
  (можно использовать что угодно для хранения данных, например, бек на Node.js+Express+MySQL; использовать SaaS вроде Firebase - обратите внимание, что могут быть нюансы с удалением "встроенных пользователей").

Реализуйте Web-приложение, позволяющее пользователям зарегистрироваться и аутентифицироваться. Неаутентифицированные пользователи не имеют доступа к управлению пользователями (доступ только к форме регистрации или форме аутентификации).
Только аутентифицированные пользователи видят **таблицу** "пользователи" (идентификатор, именем, мылом, датой регистрации, датой последнего логина, статусом) с пользователями.

Таблица **в самой левой колонке** содержит чек-боксы для множественного выделения, в заголовке колонки только чек-бокс без текста, позволяющи выделить или снять выделение со всех записей.

Над таблицей должен быть **тулбар** с действиями: Block, Unblock, Delete (два последних можно и лучше иконками). Таблица, множественное выделение, тулбар — обязательно.

Каждый пользователь может удалить или заблокировать себя или другого пользователя.

Если кто-то другой блокирует или удаляет пользователя, то при любом следующем запросе пользователь переправляется на страницу логина.

**При регистрации должна быть возможность использовать любой пароль, даже из одного символа.** Если вы используете готовый сервис для хранения пользователей, вы можете 1) реализовать своих "пользователей" или 2) принять, что некоторые требования не могут быть реализованы (зато получить результаты быстрее).

Заблокированный пользователь не может войти, удаленный может заново зарегистрироваться.

Обязательно использование **CSS-фреймворка** (рекомендация — Bootstrap, но можно любой другой).

Почему все пользователи админы, разве это не странно? Да, немного, в реальности так не будет. Есть две причины:

1. Упростить тестирование.
2. Упростить вашу работу, чтобы не нужно было работать с ролями (в данной задаче).

### Technology stack

[![NPM][NPM]][NPM-url]

[![Javascript][Javascript]][Javascript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

1. Clone the repo

   ```txt
   git clone <https://github.com/KateGoncharik/Itransition-studiyng.git>
   ```

2. Install NPM packages

   ```txt
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[NPM]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com
[Javascript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[Javascript-url]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript

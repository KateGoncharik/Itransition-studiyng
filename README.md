<a name="readme-top"></a>

<div align="center">
  <h1 align="center">Task 5</h1>

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

Deployment: [here](https://fake-data-generation-task-5.netlify.app/)

Here is the [video demonstration](https://www.youtube.com/watch?v=ZqWBrpyTvqY) of the result.

### Task description

Implement a Web-application for the fake (random) user data generation.
The single app page allows to:

1.  select region (at least 3 different, e.g. Poland, USA, Georgia or anything you prefer)
2.  specify the number of error _per record_ (two “linked” controls — slider 0..10 + binded number field with max value limit at least 1000)
3.  define seed value and [Random] button to generate a random seed If the user change anything, the table below automatically updates (20 records are generated again).
    It's necessary to support infinite scrolling in the table (you show 20 records and if the user scroll down, you add next 10 records below — add new so called "page" = "batch of records").

### Technology stack

[![NPM][NPM]][NPM-url]

[![CSS3][CSS3]][CSS3-url]

[![HTML5][HTML5]][HTML5-url]

[![Javascript][Javascript]][Javascript-url]

[![Netlify][Netlify]][Netlify-url]

[Faker](https://fakerjs.dev/) - lib for data generation.

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

3. Run live-server. Or check out the deployment [here](https://fake-data-generation-task-5.netlify.app/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[NPM]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com
[CSS3]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://ru.wikipedia.org/wiki/CSS
[Javascript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[Javascript-url]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
[HTML5]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://html.com/html5/
[Netlify]: https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7
[Netlify-url]: https://www.netlify.com/

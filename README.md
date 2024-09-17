<a name="readme-top"></a>

<div align="center">
  <h1 align="center">Task 1</h1>
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

For this and other tasks you can check out the [MindMap](https://miro.com/app/board/uXjVKXt043k=/).

### Task description

You are required to develop JavaScript code that prints the longest common substring of all the passed strings to the console (with a newline after it, using `console.log` is the most convenient). The strings are passed as command-line arguments to your JavaScript code, which is executed in Node.js.
If the longest common substring is an empty string (for example, no strings are passed, or the strings have no common characters), print a single newline (empty string).

If there are multiple solutions, print any one of them.

**Constraints**: The length of each string does not exceed 256 characters, the number of strings does not exceed 64, and the strings contain only Latin letters and Arabic numerals. The execution time for a single test should not exceed five seconds, and the output should not contain any extraneous characters. These are constraints for the automated tests and should not be hardcoded into your solution.

You are not allowed to use external packages or imports (they won't be available where the tests are run), and you cannot access the "outside world," read files, open network connections, etc.

The file must be named `lcs.js`.

**You must use only command-line arguments** When invoked without any parameters (`node lcs.js`), the output should be a newline (an "empty string").

### Technology stack

[![NPM][NPM]][NPM-url]

[![Javascript][Javascript]][Javascript-url]

[![Node-js][Node-js]][Node-js-url]

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

3. Run index.js (with any arguments instead of 'ABCDEFZ WBCDXYZ')

   ```txt
   node index.js ABCDEFZ WBCDXYZ
   ```

Here are some test-cases:

- no strings
- ABCDEFZ WBCDXYZ
- 132 12332 12312
- ABCDEFGH ABCDEFG ABCEDF ABCED
- ABCDEFGH ABCDEFG AxBCDEF ABCDxE EDCBCAABCD
- ABCQEFDEFGHIJ BCXEFGYZBCDEWEFGHU
- ABCDEFGH 1234
- ABCD

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[NPM]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com
[Javascript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[Javascript-url]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
[Node-js]: https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-js-url]: https://nodejs.org/en

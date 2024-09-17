<a name="readme-top"></a>

<div align="center">
  <h1 align="center">Task 2</h1>
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

Result:

```
SHA3-256 hash: a2441864092c02e573e14285f57ea6cb4c7f9c9dd6f4e24c10b168c10c1e9fed
```

### Task description

1. For all files from the archive <https://www.dropbox.com/s/oy2668zp1lsuseh/task2.zip?dl=1>, calculate the **SHA3-256** hash of the file contents (note that the **files are binary**; encoding should not come into play at all in this task — if you read the file into a regular string instead of a byte string using some encoding, you'll need to reverse the encoding before hashing; but it's better not to deal with encodings at all in this case).

2. The result should be represented as **64 hexadecimal digits** (in lowercase).

3. Sort the resulting hash strings lexicographically in ascending order (sort the hashes themselves, not the characters within each hash).

4. Concatenate the sorted hashes **without any separator**.

5. Append your email in lowercase to the result.

6. Calculate the SHA3-256 hash of the resulting string.

### Technology stack

[![NPM][NPM]][NPM-url]

[![Javascript][Javascript]][Javascript-url]

[![Node-js][Node-js]][Node-js-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[NPM]: https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com
[Javascript]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[Javascript-url]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript
[Node-js]: https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-js-url]: https://nodejs.org/en

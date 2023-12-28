# Darts Score
UI for application darts-score.

**Stack:** 
* Frontend: HTML, CSS, Javascript ES6, React, Typescript.
* Backend: NodeJS express.
* Database: mongodb

**Key features**:
 * Clickable dartboard.
 * Save all the games data.
 * Visualisation of player statistics.
 * Instant update of the best possible finishes after each throw.

**Supported game types**
This moment, there are only x01 (101, 301, 501, 701, 1001) and cricket games supported.

It is planned to support more game types in the future.
Support for the implementation of more features is gladly accepted.

## Installation
For local development, run the client and server as follows:


**Run the in development mode:**
```bash
$ npm install
$ npm run dev
```

## Run with Docker
You can find a running example with `docker-compose` in the following [Github](https://github.com/kosterra/darts-score-sample) repository.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

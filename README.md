# Search input POC

## Install dependencies first!

```bash
yarn install
```

## Start the project

```bash
yarn start
```
This allows to run the project in development mode, this is not intended for production in any means.

## Dev Api

To see results you need to run the fake Api, you need to run this command on a different terminal.

```bash
node mock_api
```

This will run a express server that returns users like `{ first_name: 'test', last_name: 'user' }`

# Production Build

```bash
yarn build
```

This project is configured to build a production release with 2 files (this can change in the future)
 - main.js
 - main.css

 You can rename those files when deploying, should not be a problem really.

 The idea is to allow configuration objects on the start, by default tries to find an element with the id `root`, you can change this behavior on index.js,

 ## Future

  - Allow configuration passed from the main scope of the webapp (outside this component).
  - `window` object binding, so you can call this from anywhere in the page as window.searchInput (or anything you want).

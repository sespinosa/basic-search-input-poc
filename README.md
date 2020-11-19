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

# Production setup

Check `./src/index.js` for reference.

But for clarification, you use it like this:

First load both js and css files.

Then call it (after DOM being loaded) like this:

```html
<script>
window.searchInput({
    api_url: "/api", // endpoint of the api that returns the suggestions.
    onSelect: (obj) => console.log(obj), // Function that is going to be called after selecting the suggestion
    first_name_field: "first_name", // The name of the field that is the 'first_name' of the client
    last_name_field: "last_name" // Same as above.
  }
  , "root"); // This is the id of the HTML element we want to inject our component.
</script>
```
# React Starter Kit

This is a start project for your React App

## Getting Started

To build the project **node.js** and **npm** is required (I used node v8.9.2 and npm v5.6.0).

### Installing

After node and npm are ready, navigate to ```./src``` folder and run:

```
npm install
```

## Running the project

To start webpack dev server at [http://0.0.0.0:8080](http://0.0.0.0:8080) run:

```
npm run server
```

To build a development bundle with automatic rebuild on code changes:

```
npm run start
```

To build a minified production bundle:

```
npm run build
```

The build files are located in ```./dst``` folder.

IMPORTANT! In case if you are getting "ENOENT" error during the build, try to rebuild node-sass:

```
node ./node_modules/node-sass/scripts/install.js && npm rebuild node-sass
```

## Running the project's flow validation check

To run flow validation check:

```
npm run flow
```

To run flow validation watch:

```
npm run flow:watch
```

## Running the project's unit tests

To run unit tests:

```
npm run test
```

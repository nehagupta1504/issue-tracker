Issue Tracker: React

Description

This application is an Issue Tracker built with React 17.0.2. It provides a simple and effective way to manage and track issues.

Technologies Used

- https://reactjs.org/: A JavaScript library for building user interfaces.

Implementation Details

React provides a flexible way to build composable user interfaces. While it doesn't enforce a specific design pattern, it offers useful hooks to implement an MVC pattern.

React Components

- Model: Issue reducer (reducer.js)
- View: React UI components
- Controller: App component + useReducer hook

MVC Pattern

- Model: Maintains data and behavior
- View: Displays the model in the UI
- Controller: Interfaces between view and model components

Build Steps

To build the static files, this application uses Webpack. It minifies and optimizes output files, copying necessary files to a dist folder.

Requirements

- Node (min version: 18.13.0)
- NPM (min version: 8.19.3)

Local Preview

To preview the application locally:

1. Run npm install to install dependencies.
2. Run npm run serve to start the local server.

Enjoy exploring the Issue Tracker React application!

# Peak Finder

Peak Finder will allow users to find different ski resorts across Europe.

## Running the project

The project was developed and built with node version 20.6.0 and npm version 9.8.0 and 9.8.1. While other versions might also work, these were the ones we used. Running the project is done by navigating to the frontend directory (cd frontend) and running the following commands:

```
npm install
```

```
npm run dev
```
The application is connected to the backend running on the virtual machine, however if you want to run the backend locally as well you can navigate to the backend directory and run the following commands:

```
npm install
```

```
npm start
```
This is good to know as you will need to do this before running the e2e tests.

If you want to test the API in Apollo Sandbox you can then visit: http://localhost:4000/ or http://it2810-42.idi.ntnu.no:4000/

## Testing the project

### Frontend tests

The frontend tests consists of component tests as well as snapshot tests for those components. When running these tests, API calls are intercepted by Mock Service Worker in order to isolate the tests to only the frontend. To run the tests navigate to the frontend directory and run:

```
npm run test
```

### E2E and API tests

Both API and E2E test are made with the Cypress framework. They are all also located in the frontend directory. The API test file sends different queries and mutations to the API both containing normal values as well as some edge cases. The E2E tests execute a string of user interactions, and assert that the contents on the screen are as expected. Before running the tests, make sure you have both the frontend and backend running locally. To run the tests you can navigate to the frontend directory and run:

```
npm run cypress:run
```
Alternatively if you also want to see the actions be executed, you can run:

```
npm run cypress:open
```
A window should open. From here you want to click "E2E Testing" and choose you preferred browser. Now you can run the tests individually and see a preview of the actions being executed.

## Functionality

- User can search for a specific destination, with suggestions showing based on users input.
- Clicking on a result will redirect to page showing detailed information.
- User can browse destinations by choosing a country.
- 9 destinations cards from chosen country will be displayed, and user can load 9 more until there are no more destinations.
- The site has a filter which can be applied to browse results.
- The app is responsive which allows it to be used on devices with different screen sizes.
- The user can give a destination a rating which will be persistent on the database
- The app is fully accessible. All elements can be tabbed to, and all relevant information is read aloud to the user.
- The data this app uses is from: https://www.kaggle.com/datasets/thomasnibb/european-ski-resorts


## Assumptions

We have assumed a grid of results is sufficient for the list requirement since a grid is virtually a list spread across multiple rows.


## Accessibility

Peak Finder has been developed with accessibility in mind. All pages have support for screen readers and allow the use of the tab key to navigate between elements.

## Running ESLint

To check the project for ESLint errors the following command can be run from the project's root folder:

```
npm run lint
```

To fix ESLint issues run:

```
npm run lint-fix
```

## Running prettier

To check the project for formatting issues the following command can be run from the project's root folder:

```
npm run prettier
```

To fix the issues run this:

```
npm run prettier-fix
```

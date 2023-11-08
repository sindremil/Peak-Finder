# Peak Finder

Peak Finder will allow users to find different ski resorts across Europe.

## Running the project

The project was developed and built with node version 20.6.0 and npm version 9.8.0 and 9.8.1. While other versions might also work, these were the ones we used. Running the project is done by navigating to the frontend folder (cd frontend) and running the following commands:

```
npm install
```

```
npm run dev
```

## Current limitations

We are following the requirements for each partial delivery, so at this point there are no tests. All the functionality is in place however.

## Assumptions

We have assumed a grid of results is sufficient for the list requirement since a grid is virtually a list spread across multiple rows.

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

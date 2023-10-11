# Peak Finder

Peak Finder will allow users to find different ski resorts across Europe.

## Running the app

The app can be run by using the following commands from the project's root folder:

```
npm install
```

```
npm run dev
```

## Current limitations

Since the goal for this deadline was to show the app's interface, its features, and its data we have imposed some temporary limitations which will obviously be addressed before the next deadline. The search feature currently sends the user to a static results page with placeholder results. The user can open a drawer with filtering options from this page but none of these do anything as of now. The results can be clicked but they all redirect to the same page with static data. It is possible to give a star rating to the destination, but the rating does nothing.

## Assumptioms

We have assumed a grid of results is sufficient for the list requirement since a grid is virtually a list spread across multiple rows.

## Functionality

- Detailed information about a destination can be viewed by clicking on a card.
- The site has a filter which can be applied to search results.
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

# Zemoga's Tech Test

## Stack:

- NodeJS
- Express
- MongoDB
- React

## API url

### `/api/profile/tweets`

This route handles the five last tweets by user.

### `/api/profile`

This route handles obtain user information.

### `/api/profile:profileId`

This route allows you to update the information of a profile.

### Installation

Feel free to use npm or yarn

Install the package in root folder and frontend folder

```bash
$ npm install
```

Docker to run the local DB

```bash
$ docker-compose up -d
```

Check the .env.example and copy in .env with your Twitter user name

## Run

Run the API first

```bash
npm start
```

If you run the e2e test first, the mock data will be inserted into the db for viewing in the UI.

## Test

If you want run tests, run the next line:

```bash
npm run test:e2e
```

## Authors

I spent about 8 hours to finish the test.

- [Juan Jose Vega](https://github.com/juanjosevega99)

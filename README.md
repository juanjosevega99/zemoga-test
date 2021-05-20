# Zemoga's Tech Test

## API url

### `/api/profile/tweets`

This route handles the five last tweets by user.

### `/api/profile`

This route handles obtain user information.

### `/api/profile:profileId`

This route allows you to update the information of a profile.

### Installation

Feel free to use npm or yarn

Install the package in root folder and frontend folder (run the API first)

```bash
$ npm install
```

Docker to run the local DB

```bash
$ docker-compose up -d
```

Check the .env.example and copy in .env with your Twitter user name

## Run

```bash
npm start
```

## Test

If you want run tests, run the next line:

```bash
npm run test:e2e
```

## Authors

- [Juan Jose Vega](https://github.com/juanjosevega99)

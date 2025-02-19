# Basic Blogs CRUD Application for HIC
This is the backend directory of the application. It uses Nest.js and Drizzle ORM to communicate with the PostgreSQL database.

## View the deployed version

## Setup

#### Step 1 - Install dependencies
```bash
$ npm install
```

#### Step 2 - Create a `.env` file
Copy `.env.example` and fill out the variables.

#### Step 3 - Apply the Drizzle schema to the database
```bash
$ npx drizzle-kit push
```


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
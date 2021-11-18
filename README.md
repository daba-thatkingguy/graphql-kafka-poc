# Introduction

This project is a PoC of `GraphQL-Kafka`. 

To run this project,
Provide a `MONGO_DB_URL` in your `.env` file to access mongodb. 

1. In your root directory, Run `yarn install`
2. Run `docker-compose up -d --build` to start the kafka cluster
3. To start the backend server, in your root directory run `yarn dev`, 
4. To start the `client` folder, `cd client && yarn start`.
5. To access the graphql playground, goto `localhost:{PORT-SPECIFIED-IN-YOUR-SERVER}/graphql` 
6. To access the frontend application goto `localhost:3000`
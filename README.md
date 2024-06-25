# Brad Traversy - Youtube tutorials 08 - Angular Crash Course

## [Tutorial video on Youtube](https://youtu.be/3dHNOWTI7H8)

## Used tools:

- Angular 13
- Netlify - Serverless Backend
- MongoDB - Mongoose

## Run:

- `npm i` to download node_modules
- add `.env` file with `DB_CONNECT` environment variable
- `netlify dev` to run the netlify server

## Deployed

- [On Netlify](https://gabriels-brad-traversy-angular-crash.netlify.app/)

## Mayor changes:

- I added back-end to the project
  - I'm using serverless functions on Netlify to keep my secret API key hidden.
  - I'm using mongoose in the serverless function to save the data in a mongoDB database.

## Environment variables:

- `DB_CONNECT=mongodb://localhost:27017/TasksDB`

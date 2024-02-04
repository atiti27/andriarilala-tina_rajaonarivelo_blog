# Blog app

## About the project

This project is a Blog app where you can consult various posts, interact with it, etc.

## Getting Started

### Install packages

Before running, you need to import necessary packages. Just run this command:

```bash
npm install
```

### Add your .env.local file

You'll need to create a .env.local file based on the .env.local.txt file that is in the project as an exemple. This file has to be at the root of the project.

### Migrations

You have to run migrations to construct the database. But first, create your database with the name you want. Then run the migrations:

```bash
npx knex migrate:latest
```

### Seeds

Now, you will need to generate fake data.

You can connect with an administrator account. Just because I couldn't export the hashPassword method, you have to give manually a passwordHash and a passwordSalt according to your password peper.

What you can do before is create a lambda user and go to the database panel to pick the passwordHash and the passwordSalt, so you can add it to the seed file "initial-data.mjs".

You can run the seeds files with this command line:

```bash
npx knex seed:run
```

## Running project

All you have to do finally is to run the development server:

```bash
npm run dev
```

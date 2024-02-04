# Blog app

## About the project

Short summary of what the project is

## Getting Started

### DB

You need first to create a database. Keep the name, user and password on mind, you will need it for connection into the database you will create (see section .env.local below).

### Migrations

You have to run migrations to construct the database. But first, create your database with the name you want. Then run the migrations:

```bash
npx knex migrate:latest
```

### Seed

Now, you will need to generate data. You can run the seeds files with this command line:

```bash
npx knex seed:run
```

## Add your .env.local file

You'll need to create a .env.local file based on the .env.local.txt file that is in the project as an exemple. This file has to be at the root of the project.

## Running project

All you have to do finally is to run the development server:

```bash
npm run dev
```

You can connect with an administrator account. Just because I couldn't export the hashPassword method, I had to give manually a passwordHash and a passwordSalt.

So for the test, admin credentials are:

- email: admin@example.com
- password: Azerty1234&

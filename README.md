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

### DB

You need first to create a postgresql database. Keep the name, user and password on mind, you will need it for connection into the database you will create (see section .env.local above).

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

## Running project

All you have to do finally is to run the development server:

```bash
npm run dev
```

You can connect with an administrator account. Just because I couldn't export the hashPassword method, I had to give manually a passwordHash and a passwordSalt.

So for the test, admin credentials are:

- email: admin@example.com
- password: Azerty1234&

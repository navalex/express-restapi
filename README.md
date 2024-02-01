# Navalex REST API Boilerplate

This repo aim to give a starter-pack to make a REST API using Express.js, Prisma, Typescript & Docker.

## Getting started

### 1. Create your repo and install dependencies

Create your new repo using this one as template using the "Use this template" button on top right.
If you don't want to use Github template feature, you can still download the project as a ZIP or any other way to get the files on your computer.

When you have your repo on your machine, go on the root folder, and install the NPM packages:

```shell
$ npm install
```

### 2. Create database

By default, this repo uses Docker Compose to run both the project and a Postgres database.

Prisma is the ORM we gonna use to connect to this DB. You can already check the example User model inside [`prisma/schema.prisma`](./prisma/schema.prisma). When you are ok with this file, let's make your first database migration to create the database, and defined models:

```shell
$ docker compose run api prisma migrate dev --name init
```

### 3. Define environment

Next step is to define some environment variables to make the API able to talk with database. You have a [`.env.example`](./.env.example) file with all needed variables. Just copy it to `.env` file (you can also change variable values if you want to):

```shell
$ cp .env.example .env
```

### 3. Start the REST API server

Now, we have everything setup to run the server. And to do so, we just need to launch the docker-compose project:

```shell
$ docker compose up -d --build
```

- <i>-d is used to launch the server in detached mod (background</i>

To stop it, use this command:
```shell
$ docker compose down
```

The server is now running on [`http://localhost:3005`](http://localhost:3005) (if you changed the `API_PORT`, adjust this URL).

## Evolving the app

Evolving the application typically requires two steps:

1. Migrate your database using Prisma Migrate
1. Update your application code by adding new modules

For the following example scenario, assume you want to add a "article" feature to the app where users can create an article with title, content, date & author.

### 1. Update your Prisma schema

The first step is to add a new table, e.g. called `Article`, to the database. You can do this by adding a new model to your [Prisma schema file](./prisma/schema.prisma) file and then running a migration afterwards:

```diff
// ./prisma/schema.prisma

model User {
  id      Int      @default(autoincrement()) @id
  name    String?
  email   String   @unique
+ posts   Post[]
}

+model Post {
+  id        Int      @id @default(autoincrement())
+  createdAt DateTime @default(now())
+  title     String
+  content   String?
+  author    User?    @relation(fields: [authorId], references: [id])
+  authorId  Int?
+}
```

Once you've updated your data model, you can execute the changes against your database with the following command:

```shell
$ npx prisma migrate dev --name add-article
```

This adds another migration to the `prisma/migrations` directory and creates the new `Article` table in the database.

### 2. Create your new module

Inside `src` folder, you have an `app` folder, containing modules. This modules contains 2 files:
- `[yourModule].controller.ts`: Contain logic of each routes for this feature
- `[yourModule].router.ts`: Define the routes of this feautre

To load a module, we need to add the module router inside the app router located in [`./src/router.ts`](./src/router.ts).

In order to create a new module, you can use a dedicated command that do the job for you, or just copy an existing module and adapt it. For this example we are gonna use the CLI command:

```shell
$ docker compose run api npm run makeController article

Creating new controller and router for: article
Controller and router for article created successfully.
Do you want to add this to ./src/router.ts automatically? (yes/no) yes
Added articleRouter to ./src/router.ts successfully.
```

You can now check your `./src/app/article` folder freshly created. We also choosed to auto-include it in the app router (you can check in the file).

You can now create your `article` routes logic inside `./src/app/article/article.controller.ts`, and then add the routes in `./src/app/article/article.router.ts`

The module layout allow the project to be flexible and separate each logic of your app/

## Switch to another database (e.g. SQLite, MySQL, SQL Server, MongoDB)

If you want to try this example with another database than SQLite, you can adjust the the database connection in [`prisma/schema.prisma`](./prisma/schema.prisma) by reconfiguring the `datasource` block. 

Learn more about the different connection configurations in the [docs](https://www.prisma.io/docs/reference/database-reference/connection-urls).

<details><summary>Expand for an overview of example configurations with different databases</summary>

### PostgreSQL

For SQLite, the connection URL has the following structure:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./myDatabaseName.db"
}
```

### MySQL

For MySQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
}
```

### Microsoft SQL Server

Here is an example connection string with a local Microsoft SQL Server database:

```prisma
datasource db {
  provider = "sqlserver"
  url      = "sqlserver://localhost:1433;initial catalog=sample;user=sa;password=mypassword;"
}
```

### MongoDB

Here is an example connection string with a local MongoDB database:

```prisma
datasource db {
  provider = "mongodb"
  url      = "mongodb://USERNAME:PASSWORD@HOST/DATABASE?authSource=admin&retryWrites=true&w=majority"
}
```

</details>

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Create issues and ask questions on [GitHub](https://github.com/navalex/express-restapi/issues)
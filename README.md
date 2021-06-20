# expressive-nuxt

## Features
- 99% TypeScript and uses ts-node <3
- Database management with TypeORM
- API with ExpressJS
- User authenication and sessions
- Email and Template System
- Feed data directly into NuxtJS during SSR
- NuxtContent + Socket.io
- Beautifully Simple Premade Form Components
- Basic theme system written in SCSS
- ESLint + Prettier to keep it clean <3
- Code Snippets
- Path aliases
- Recommended VSCode Extensions

## Setup

Before starting, be sure to copy `example.env` to `.env` and `ormconfig.example.json` to `ormconfig.json`. Fill in and replace the details to match what you have setup on your local machine. A database connection will be needed to start the application, SMTP is optional but recommended.

Please note that when first running the app, it will most likely hang on "creating database connection." for a couple seconds. This is because it is creating the tables and schemas in the database. Future runs should be quicker unless it has to rebuild the database again. 

## Running
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

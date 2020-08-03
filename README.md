# hasura-demo

This project demonstrates how to build a todo list app using a
**backend-less** setup with [Hasura Engine](https://hasura.io/opensource/).

If you are eager to see it in action for free, just click the following button:

[![Open in GitPod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/marcopeg/gitpod-hasura-demo)

And while you wait for the system to initialize, watch this gif-video to figure out what to expect (roughly):

![GitPod Hasura Demo](./gitpod-hasura-demo.gif)

---

👉 You can read a more detailed story about the experience of building this here:
https://marcopeg.com/2020/hasura-in-gitpod

---

⭐️ If you enjoy this repo, give me a star!

---

## Quick Start with GitPod

When you click on the "Open in GitPod" button, a new _workspace_ is
being created (you may need to grant access via GitHub) and this
repository is automatically cloned into it and executed.

> **It may take a few minutes for the system to correctly start and
> initialize.**

👉 Once ready, you will be prompted with a popup that asks you to open
the browser or the preview, go with the preview option and enjoy
a new todo list app!

![todo](https://i.imgflip.com/3q5zv1.jpg)

This is NOT just a simple TodoList project, it has to run not one,
not two, ... but 6 services in order to give you the ability to
create a new todo:

- [PostgreSQL](https://www.postgresql.org) - the best database ever
- [Adminer](https://www.adminer.org) - database manager
- [Hasura Engine](https://hasura.io/docs/1.0/graphql/manual/index.html) - GraphQL Backend
- [Hasura Migrations CLI](https://hasura.io/docs/1.0/graphql/manual/migrations/index.html) - seeds the db and the Hasura settings
- String uppercasing - NodeJS backend
- [Webpack + CRA](https://reactjs.org/docs/create-a-new-react-app.html) - frontend server

It is so complicated on purpose just to prove the point that it is
possible to achieve a "one click startup" environment thanks to
[GitPod](https://gitpod.io) and similar Cloud IDE.

On top of it, this repository is also a personal starting point for other
fast-prototyping projects, check out the release versions to try out
older (and likely simpler) setups.

## Quick Start with Docker

If you prefer to run the application locally, you should clone the repo and then simply
run `docker-compose up` in order to gain:

- Postgres > `postgres://postgres:postgres@localhost:5432/postgres`
- Hasura console > http://localhost:8080
- Postgres admin tool > http://localhost8081
- NodeJS Backend > http://localhost:4000
- CRA Frontend > http://localhost:3000

> Running Webpack in Docker is quite a hassle, I strongly suggest to run `make start` in order to run the entire backend in Docker, but let the host's NodeJS run Webpack and the client app

## A Word on Security

This repository is a work in progress meant to provide a starting point to play
with Hasura and its data lifecycle best-practices.

The Hasura instance is secured with an admin secret to exploit the possibility
of the `anonymous` role in describing how to access data via GraphQL.

The backend service uses a custom JWT token generated on jwt.io (that expires in
a few hundreds years) to perform the data transformation activities.

Enjoy,
Marco

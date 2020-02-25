# hasura-demo

This project demonstrates how to build a todo list app using a
backendless setup.

[![Open in GitPod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/marcopeg/gitpod-hasura-demo)

---

👉 You can read a more detailed story about the experience of building this here:
https://marcopeg.com/2020/hasura-in-gitpod

---

⭐️ If you enjoy this repo, give me a star!

---

## Kickoff

When you click on the "Open in GitPod" button, a new _workspace_ is
being created (you may need to grant access via GitHub) and this
repository is automatically cloned into it and executed.

It may take a few minutes for the system to correctly start and
initialize.

👉Once ready, you will be prompted with a popup that asks you to open
the browser or the preview, go with the preview option and enjoy
a new todo list app!

![todo](https://i.imgflip.com/3q5zv1.jpg)

This is NOT just a simple TodoList project, it has to run not one,
not two, ... but 5 services in order to give you the ability to
create a new todo:

- PostgreSQL (database)
- Hasura (GraphQL Backend)
- NodeJS Seeder Service (seeds the db and the Hasura settings)
- String uppercasing NodeJS (detached backend)
- Webpack (frontend server)

It is so complicated on purpose just to prove the point that it is
possible to achieve a "one click startup" environment thanks to
[GitPod](https://gitpod.io) and similar Cloud IDE.

Enjoy,
Marco

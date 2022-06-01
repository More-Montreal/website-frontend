# 🏗️ More MTL Website Frontend

> This is the frontend repository for the [moremtl.ca](https://moremtl.ca) website. More Montreal is a group of people advocating housing for all through rational and realistic solutions.

You will also need to setup the [backend part of the website](https://github.com/More-Montreal/website-backend) to generate the static front.

## Requirements
- Node v16 or higher LTS

## Setup
First create a .env file using the .env.example
```sh
cat .env.example > .env
```

Input the STRAPI_TOKEN from the backend. Follow [this guide](https://docs.strapi.io/user-docs/latest/settings/managing-global-settings.html#configuring-internationalization-locales) to learn how to create a Full-access API token

Running the generator
```sh
npm install
npm run develop
```

When you make content changes on the admin panel run the following to update the front content:
```sh
npm run clean && npm run develop
```

The website should be accessible at this address: [localhost:8000](localhost:8000)
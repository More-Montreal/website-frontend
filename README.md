# 🏗️ More MTL Website Frontend

> This is the frontend repository for the [moremtl.ca](https://moremtl.ca) website. More Montreal is a group of people advocating housing for all through rational and realistic solutions.

You will also need to setup the [backend part of the website](https://github.com/More-Montreal/website-backend) to generate the static front.

## Requirements
- Node v16 or higher LTS

## Setup
First create a .env file using the .env.example
```sh
cp .env.example .env
```

Make sure to fill the values in `.env`.

Input the STRAPI_TOKEN from the backend. Follow [this guide](https://docs.strapi.io/user-docs/latest/settings/managing-global-settings.html#configuring-internationalization-locales) to learn how to create a Full-access API token.
You can set up the backend locally, instructions here: [https://github.com/More-Montreal/website-backend](https://github.com/More-Montreal/website-backend)

**IMPORTANT: In the backend, all content type must have at least one value (and it needs to be published), else the gatsby frontend will not like it. You need to create this manually if you have your own backend. Images must have alt text, etc. you can see the errors when running the frontend and going to http://localhost:8000. You might need to delete `.cache` and `public` directory and `npm run develop` to see which problems still need fixing.**

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
## Setup

The first thing we'll need to do is register our application with Github to use it for Auth. Create the application at the [GitHub Applications page](https://github.com/settings/applications/new) and make sure you note down your generated client id and client secret- we’ll need that information soon.

For the homepage URL you can enter `http://localhost:5000` and for the authorization callback URL you can enter `http://localhost:5000/auth`

```zsh
$ cp backend/.env.sample backend/.env
# Open up your .env file and edit the appropriate fields
$ cd backend && npm install
$ cd ../frontend && npm install
$ cd .. && npm install
$ npm run dev
```

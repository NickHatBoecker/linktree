# Linktree

VueJS App for Linktrees. Needs a [Contentful](https://www.contentful.com/) API.

See [Video Tutorial]() to create your own.

## Project setup
```
yarn install
```

Copy `.env` file to `.env.local` and put in your Contentful Credentials.

**Attention:** Only use read-only Contentful access token, because it will be publicy available in the apps source code, after build. 

### Compiles and hot-reloads for development
```
yarn dev
```

### Compiles and minifies for production
```
yarn build
```

After this copy `dist` folder to your hoster.

### Lints and fixes files
```
yarn lint
```

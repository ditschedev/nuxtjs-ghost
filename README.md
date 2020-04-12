# nuxtjs-ghost

![npm version](https://badge.fury.io/js/nuxtjs-ghost.svg)
![npm downloads](https://img.shields.io/npm/dw/nuxtjs-ghost)
![License](https://img.shields.io/github/license/ditschedev/nuxtjs-ghost)

> NuxtJS module to easily interact with the 👻 Ghost API

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

To start using the module you first need to install it using the package manager of your choice.

Installation with yarn

```bash
yarn add nuxtjs-ghost
```

Installation with npm

```bash
npm install nuxtjs-ghost
```

After that you need to register the plugin, that NuxtJS can pick it up. To do this, add `nuxtjs-ghost` to your `modules` section of `nuxt.config.js`.

```js
{
  modules: [
    'nuxtjs-ghost',
  ]
}
```

## Configuration
The plugin needs an api key of your site and its endpoint url. Optionally you can pass the version of the Ghost API you want to use. Typically the endpoint for your api is your sites hostname.

To set these values you have two options:
1. Use the default module options
2. Add your options globally to the `nuxt.config.js`
3. Use environment variables

#### Module Options
When registering the module, don't register it as a string, but an array. The syntax should be:
```js
{
  modules: [
    [
      'nuxtjs-ghost',
      {
        url: 'YOUR_API_ENDPOINT',
        key: 'YOUR_API_KEY'
      }
    ]
  ]
}
```

#### Global Configuration
To set up global configuration, add the following object to your `export` of `nuxt.config.js`:
```js
ghost: {
  url: 'YOUR_API_ENDPOINT',
  key: 'YOUR_API_KEY'
}
```

#### Environment Variables
If you don't want sensitive data in your code, or got multiple environments, you can use environment variables to configure this plugin.

`GHOST_API_KEY`: Sets the api key.
`GHOST_API_URL`: Sets the api endpoint.

## Usage
The usage is pretty straight forward. This package is just a wrapper for the official [JavaScript Content API](https://ghost.org/docs/api/v3/content/). Please check out their documentation to learn about [filtering](https://ghost.org/docs/api/v3/content/#parameters) or [pagination](https://ghost.org/docs/api/v3/content/#pagination). The `filter` parameter of the following methods is an `object` representation of the available query filters. 

To access the wrapper it is getting exposed to the application context as `$ghost`. Use it in your pages `created()`, or `mounted()` functions using `this`.
```js
export default {
  async created() {
    const posts = await this.$ghost.getPosts()
  }
}
```
Or use it in SSR-mode inside of `asyncData()`
```js
export default {
  async asyncData({ $ghost }) {
    const posts = await $ghost.getPosts()
    return {
      posts
    }
  }
}
```

All available methods are documented below:

-----

#### `async getPosts(filter)` - Gets all posts matching the filter query.
**Parameters**:
- (optional) `filter`: Object used for filtering. E.g.: `{limit: 2, include: 'tags,authors'}`

**Returns**: An `array` of posts

-----

#### `async getPost(query, filter)` - Gets the post matching the identifier given in `query`.
**Parameters**: 
- `query`: Object giving the identifier of the post. Can be `slug` or `id`. E.g.: `{slug: 'my-post'}`
- (optional) `filter`: Object used for filtering. E.g.: `{formats: ['html', 'plaintext']}}`

**Returns**: An `object` representing a post

-----

#### `async getAuthors(filter)` - Gets all authors matching the filter query.
**Parameters**:
- (optional) `filter`: Object used for filtering. E.g.: `{include: 'count.posts'}`

**Returns**: An `array` of authors

-----

#### `async getAuthor(query, filter)` - Gets the author matching the identifier given in `query`.
**Parameters**: 
- `query`: Object giving the identifier of the author. Can be `slug` or `id`. E.g.: `{id: '1234'}`
- (optional) `filter`: Object used for filtering. E.g.: `{page: 2}`

**Returns**: An `object` representing an author

-----

#### `async getTags(filter)` - Gets all tags matching the filter query.
**Parameters**:
- (optional) `filter`: Object used for filtering. E.g.: `{include: 'count.posts'}`

**Returns**: An `array` of tags

-----

#### `async getTag(query, filter)` - Gets the tag matching the identifier given in `query`.
**Parameters**: 
- `query`: Object giving the identifier of the tag. Can be `slug` or `id`. E.g.: `{id: '1234'}`
- (optional) `filter`: Object used for filtering. E.g.: `{include: 'count.posts'}`

**Returns**: An `object` representing a tag

-----

#### `async getPages(filter)` - Gets all pages matching the filter query.
**Parameters**:
- (optional) `filter`: Object used for filtering. E.g.: `{limit: 2}`

**Returns**: An `array` of pages

-----

#### `async getPage(query, filter)` - Gets the page matching the identifier given in `query`.
**Parameters**: 
- `query`: Object giving the identifier of the page. Can be `slug` or `id`. E.g.: `{id: '1234'}`
- (optional) `filter`: Object used for filtering. E.g.: `{fields: ['title']}`

**Returns**: An `object` representing a page

-----

#### `async getSettings()` - Gets your sites settings.

**Returns**: An `object` representing your settings

-----

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Tobias Dittmann

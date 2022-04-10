# @cloak-app/craft

Craft CMS API client and static site generation conventions.

- [View demo](https://cloak-craft.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-craft)

## Install

1. Install with `yarn add @cloak-app/craft`
2. Add to `nuxt.config` with `modules: ['@cloak-app/craft']`

### Options

- `cloak.craft:`
  - `endpoint` - The Craft CMS API endpoint, for example: https://cms.domain.com/api.  Defaults to `process.env.CMS_ENDPOINT`.
  - `site` - The Craft CMS Site handle to restrict queries to.  If populated, it gets automatically passed into all GraphQL queries as a variable called `site`.  Defaults to `process.env.CMS_SITE`.

## Usage

### Inside of Nuxt

The [`craft` Nuxt plugin](./plugins/craft.js) injects `$craft` globally.  This is an Axios instance with it's `baseUrl` set to `cloak.craft.endpoint`.  In addition, you can call:

- `$craft.execute({ query, variables })` - Executes a GraphQL request that automatically adds a `site` GraphQL variable with the value from the `cloak.craft.site` value.
- `$craft.getEntries({ query, variables })` - Sugar for `$craft.execute()` that returns the `entries` property of the GraphQL response.
- `$craft.getEntry({ query, variables })` - Sugar for `$craft.execute()` that returns the `entry` property of the GraphQL response.
- `$craft.setSite(site)` - Updates the `site` variable for all future requests at runtime.

### Outside of Nuxt

You can make an instance of the Craft Axios client when outside of Nuxt (like in a Netlify function) as follows:

```js
import { makeCraftClient } from '@cloak-app/craft/plugins/craft'
import axios from 'axios'
const craft = makeCraftClient(axios, {
  endpoint: process.env.CMS_ENDPOINT,
  site: process.env.CMS_SITE,
})
const articles = await craft.getEntries({
  query: '{ entries(section:"articles") { id, title } }'
})
```

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).

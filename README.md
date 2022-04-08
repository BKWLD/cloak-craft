# @cloak-app/craft

Craft CMS API client and static site generation conventions.

- [View demo](https://cloak-craft.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-craft)

## Install

1. Install with `yarn add @cloak-app/craft`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/craft']`

### Module Options

- `cloak.craft:`
  - `endpoint` - The Craft CMS API endpoint, for example: https://cms.domain.com/api.  Defaults to `process.env.CMS_ENDPOINT`.
  - `site` - The Craft CMS Site handle to restrict queries to.  If populated, it gets automatically passed into all GraphQL queries as a variable called `site`.  Defaults to `process.env.CMS_SITE`.

## Usage

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

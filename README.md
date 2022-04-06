# @cloak-app/craft

Craft CMS API client and static site generation conventions.

- [View demo](https://cloak-craft.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-craft)

## Install

1. Install with `yarn add @cloak-app/craft`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/craft/nuxt']`

### Module Options

- `cloak.craft:`
  - `endpoint` - The Craft CMS API endpoint, for example: https://cms.domain.com/api.  Defaults to `process.env.CMS_ENDPOINT`.
  - `site` - The Craft CMS Site handle to restrict queries to.  If populated, it gets automatically passed into all GraphQL queries as a variable called `site`.  Defaults to `process.env.CMS_SITE`.

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).

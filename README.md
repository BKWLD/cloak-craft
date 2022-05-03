# @cloak-app/craft

Craft CMS API client and static site generation conventions.

- [View demo](https://cloak-craft.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-craft)

### Features

- Globally injected `$craft` helper object for executing queries that are scoped to a Craft site.
- Helper factory methods for constructing `$craft` outside of Nuxt runtime code.
- Automatic static generate of dynamic routes using `pageTypenames`.
- Automatic creation of Netlify `_redirects` file from Craft "Redirects" section.

## Install

1. Install with `yarn add @cloak-app/craft`
2. Add to `nuxt.config` with `modules: ['@cloak-app/craft']`

### Module Options

Set these properties within `cloak: { craft: { ... } }` in the nuxt.config.js:

- `endpoint` - The Craft CMS API endpoint, for example: https://cms.domain.com/api.  Defaults to `process.env.CMS_ENDPOINT`.
- `site` - The Craft CMS Site handle to restrict queries to.  If populated, it gets automatically passed into all GraphQL queries as a variable called `site`.  Defaults to `process.env.CMS_SITE`.
- `pageTypenames` - An array of GraphQL typenames of Craft entry types whose URIs should be generated as pages.  For example: `['towers_tower_Entry']`.  Defaults to `[]`.
- `generateRedirects` - If true, adds redirect to the `static/_redirects` file using a `redirects` Craft section.

## Usage

### Inside of Nuxt app

The [`craft-client` Nuxt plugin](./plugins/craft-client.js) injects `$craft` globally.  This is an Axios instance with it's `baseUrl` set to `cloak.craft.endpoint`.  In addition, you can call:

- `$craft.execute({ query, variables })` - Executes a GraphQL request that automatically adds a `site` GraphQL variable with the value from the `cloak.craft.site` value.
- `$craft.getEntries({ query, variables })` - Sugar for `$craft.execute()` that returns the `entries` property of the GraphQL response.
- `$craft.getEntry({ query, variables })` - Sugar for `$craft.execute()` that returns the `entry` property of the GraphQL response.
- `$craft.setSite(site)` - Updates the `site` variable for all future requests at runtime.

```coffee
# A page component
export default
  asyncData: ({ $craft, params }) ->
    page = await $craft.getEntry
      variables: uri: params.tower
      query: '''
        query getTower($uri:[String], $site:[String]) {
          entry(uri:$uri, site:$site) {
            title
          }
        }
      '''
    return { page }
```

### Inside of Nuxt module

You can use the `makeModuleCraftClient()` factory method within a Nuxt module to build a `$craft` instance.  In a module, we can't use the instance that is injected by the `craft-client` because that is constructed later in the lifecycle

```js
// A Nuxt module
import { makeModuleCraftClient } from '@cloak-app/craft/factories'
export default function() {
  const $craft = makeModuleCraftClient(this)
}
```

### Outside of Nuxt

You can make an instance of the Craft Axios client when outside of Nuxt (like in a Netlify function) as follows:

```js
// The entry point of a non-Nuxt app
import Vue from 'vue'
import { makeCraftClient } from '@cloak-app/craft/factories'
Vue.prototype.$craft = makeCraftClient({
  endpoint: process.env.CMS_ENDPOINT,
  site: process.env.CMS_SITE,
})
```

### Regarding fallback

This package enables the [`generate.fallback` option.](https://nuxtjs.org/docs/configuration-glossary/configuration-generate#fallback).  This is done so that admins can use Craft previews on new pages that haven't been statically generated yet.  When the fallback is rendered, data that would normally be pre-fetched into Vuex via [`nuxtServerInit`](https://nuxtjs.org/docs/directory-structure/store#the-nuxtserverinit-action) _won't_ exist before the page is mounted.  Thus, you need to be careful to add `v-if` test conditions for dependent Vuex data, like the header and footer.

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).

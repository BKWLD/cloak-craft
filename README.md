# @cloak-app/craft

Craft CMS API client and static site generation conventions.

- [View demo](https://cloak-craft.netlify.app)
- [Edit CodeSandbox](https://githubbox.com/BKWLD/cloak-craft)

## Usage

```vue
<cloak-craft />
```

## Install

1. Install with `yarn add @cloak-app/craft`
2. Add to `nuxt.config` with `buildModules: ['@cloak-app/craft/nuxt']`

### Project Dependencies

- `.max-w*` styles (included in Cloak via `whitespace.styl`)

### Module Options

- `cloak.craft:`
  - `maxWidthClass` - The default max-width class to use for the block.

## Components

### `cloak-craft-block`

Renders a Block to be used within a Tower.

- props:
  - `maxWidthClass` - A `max-w-*` class to apply to the block

## Contributing

Run `yarn dev` to open a Nuxt dev build of [the demo directory](./demo).

# [@cloak-app/craft](https://github.com/BKWLD/cloak-craft)

## List Towers of a site

This is quick demo for testing regressions that lists the towers of a site

<tower-list></tower-list>

```vue
<template lang='pug'>

ul.tower-list
  li(v-for='tower in towers' :key='tower.id')
    | {{ tower.title }} ({{ tower.id }})

</template>

<script lang='coffee'>
export default

  data: -> towers: []

  fetch: ->
    @towers = await @$craft.getEntries query: """
      query {
        entries(section: "towers") {
          id
          title
        }
      }
      """

</script>

<style lang='stylus' scoped>

.tower-list
  border 1px dashed currentColor
  padding 1em

</style>
```


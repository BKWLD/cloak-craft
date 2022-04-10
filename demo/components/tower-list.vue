<!-- List all of the towers given the CMS endpoint -->

<template lang='pug'>

ul.tower-list
	li(v-for='tower in towers' :key='tower.id')
		| {{ tower.title }} ({{ tower.id }})

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

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

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.tower-list
	border 1px dashed currentColor
	padding 1em

</style>

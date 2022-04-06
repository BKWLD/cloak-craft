<!-- Renders a craft block -->

<template lang='pug'>

section.craft-block(:class='classes') Heya world

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	props:

		# The max-width class
		maxWidthClass:
			type: String
			default: -> @$config.cloak?.craft?.blockMaxWidthClass || ''

	computed:

		# Root classes
		classes: -> @maxWidthClass

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.craft-block
	border 1px dashed currentColor
	padding 1em
	margin-v 1em

</style>

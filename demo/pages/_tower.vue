<!-- Example for use with static generation demo -->

<template lang='pug'>

.tower
	h1 {{ page.title }}
	p This page was created with mocked Craft data.

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	# Page page data
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

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>



</style>

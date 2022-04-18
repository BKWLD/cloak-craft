<!-- Example for use with static generation demo -->

<template lang='pug'>

.tower
	h1 {{ page.title }}
	p This page was created with mocked Craft data.

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import pageMixin from '../../mixins/page'
export default

	mixins: [ pageMixin ]

	# Page page data
	asyncData: ({ $craft, $notFound, params }) ->
		try page = await $craft.getEntry
			variables: uri: params.tower
			query: '''
				query getTower($uri:[String], $site:[String]) {
					entry(uri:$uri, site:$site) {
						title
					}
				}
			'''
		catch e then $notFound()
		return { page }

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>



</style>

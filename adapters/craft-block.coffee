###
Render the craft block from Craft block data
###
export default
	functional: true
	props: block: Object
	render: (create, { props: { block }, data }) ->
		create 'cloak-craft-block', {
			...data
			props: block
		}

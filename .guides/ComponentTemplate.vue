<script lang="ts">
	import { Vue, Component, Prop, Watch } from 'vue-property-decorator';


	@Component({
		components: {},
	})
	export default class ExampleClass extends Vue {

		/** Custom props */
		@Prop({ default: 'something' }) public example4!: string;
		@Prop({ default: false, type: Boolean }) public isRequired!: boolean;

		/** States */
		public example3!: string;

		/** Prop watcher */
		@Watch('example4')
		public onChangeExample4(value: string, oldValue: string) {}

		/** Computed property */
		public get example1() {
			return '';
		}

		/** Method */
		public example2() {}

		/** Lifecycle hook */
		public created() {}
		public mounted() {}
		public updated() {}
		public destroyed() {}

	}
</script>


<template>
	<div>I'm an empty component :)</div>
</template>


<style scoped lang="scss">
	// @import '../../../css/variables';
</style>

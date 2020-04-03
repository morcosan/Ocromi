<script lang="ts">
	/**
	 * Used when there are 5 or more options for the user to choose from.
	 */

	import { Component, Prop, Mixins, Watch } from 'vue-property-decorator';
	import YBaseFormSelect, { Option } from '../../mixins/YBaseFormSelect';
	import { QSelect } from 'quasar';


	@Component({
		components: { QSelect },
	})
	export default class YFieldSelect extends Mixins(YBaseFormSelect) {

		/** Content props */
		@Prop({ default: null }) public value!: Option | null;

		/** Compute validation rules */
		public get finalRules() {
			const rules = [];
			// add required rule
			if (this.isRequired) {
				rules.push((value: Option | null) => (!!value || this.$text.all.requiredField));
			}
			return rules;
		}

	}
</script>


<template>
	<QSelect
		@input="$emit('input', $event)"
		@filter="onFilterInput"
		:value="value"
		:options="currOptions"
		:label="finalLabel"
		:hint="hint"
		:readonly="isReadonly"
		:disable="isDisabled"
		:error-message="error"
		:error="error !== ''"
		:rules="finalRules"
		:bg-color="bgColor"
		:class="{ 'y-form-control-spacing': hasSpacing }"
		input-debounce="0"
		ref="qSelect"
		outlined
		lazy-rules
		clearable
		use-input
	/>
</template>


<style scoped lang="scss">
	// @import 'src/css/variables';
</style>

<script lang="ts">
	/**
	 * Used when user needs to choose an interval from a spectrum.
	 */

	import { Component, Prop, Mixins } from 'vue-property-decorator';
	import YBaseFormSlider, { Range } from '../../mixins/YBaseFormSlider';
	import { QRange } from 'quasar';


	@Component({
		components: { QRange },
	})
	export default class YSliderRange extends Mixins(YBaseFormSlider) {

		/** Content props */
		@Prop({ default: () => ({ min: 0, max: 0 }) }) public value!: Range;

		/** Config props */
		@Prop({ default: false, type: Boolean }) public isFixed!: number;

		/** States */
		public labelElems: HTMLElement[] = [];

		/** Limit the decimals when no steps */
		public onInput(value: Range) {
			// limit decimals
			if (this.valueStep === 0 && this.stepDecimals > 0) {
				const tens = 10 ** this.stepDecimals;
				value.min = Math.round(value.min * tens) / tens;
				value.max = Math.round(value.max * tens) / tens;

				// update text manually, fail gracefully
				if (this.labelElems.length === 2) {
					this.labelElems[0].innerHTML = String(value.min);
					this.labelElems[1].innerHTML = String(value.max);
				}
			}

			// update
			this.$emit('input', value);

			// mark as dirty and without error
			this.isDirty = true;
			this.innerError = '';
		}

		/**
		 * Lifecycle hook
		 * Bug fix: range labels are different from model
		 * Store html elements
		 */
		public mounted() {
			if (this.$refs.qRange) {
				// @ts-ignore
				if (this.$refs.qRange.$el.querySelectorAll) {
					// @ts-ignore
					this.labelElems = this.$refs.qRange.$el.querySelectorAll('.q-slider__pin-text');
				}
			}
		}

	}
</script>


<template>
	<div :class="{
		'y-form-box y-slider': true,
		'y-form-box--required': isRequired,
		'y-form-control-spacing': hasSpacing,
		'text-negative': innerError,
	}">
		<div :class="{
			['y-form-box__fieldset bg-' + bgColor]: true,
			'y-form-box__fieldset--with-error': innerError,
			'y-form-box__fieldset--labeled': !!label,
			'y-form-box__fieldset--disabled': isDisabled,
			'y-form-box__fieldset--readonly': isReadonly,
		}">
			<div v-if="!!label" :class="{ ['y-form-box__label text-subtitle1 bg-' + bgColor]: true }">
				{{ isRequired ? (label + ' *') : label }}
			</div>

			<div class="y-slider__min-max text-caption">
				<div class="y-slider__min">{{ minValue }}</div>
				<div class="y-slider__max">{{ maxValue }}</div>
			</div>

			<QRange
				@input="onInput"
				:value="value"
				:min="minValue"
				:max="maxValue"
				:step="valueStep"
				:label="!!label"
				:left-label-value="value.min + thumbSuffix"
				:right-label-value="value.max + thumbSuffix"
				:markers="hasMarkers"
				:readonly="isReadonly"
				:disable="isDisabled"
				:label-always="isDirty || isDisabled || isReadonly"
				:drag-only-range="isFixed"
				ref="qRange"
				drag-range
			/>
		</div>

		<div :class="{ 'y-form-box__error text-caption': true, 'y-form-box__error--visible': innerError }">
			{{ innerError }}
		</div>
	</div>
</template>


<style scoped lang="scss">
	//@import 'src/css/variables';
</style>

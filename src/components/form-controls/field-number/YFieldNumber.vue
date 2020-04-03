<script lang="ts">
	/**
	 * Used when user needs to enter numeric values (even with decimals).
	 */

	import { Component, Prop, Mixins } from 'vue-property-decorator';
	import YBaseFormField from '../../mixins/YBaseFormField';
	import { QInput, QTooltip } from 'quasar';
	import { numberRegex } from 'src/utils/regex';
	import { isSpecialKey, insertInString } from 'src/utils';


	@Component({
		components: { QInput, QTooltip },
	})
	export default class YFieldNumber extends Mixins(YBaseFormField) {

		/** Content props */
		@Prop({ default: '' }) public value!: number | string;

		/** Config props */
		@Prop({ default: false, type: Boolean }) public hasDecimals!: boolean;
		@Prop({ default: '' }) public minValue!: number | string;
		@Prop({ default: '' }) public maxValue!: number | string;
		@Prop({ default: 1 }) public valueStep!: number;
		@Prop({ default: -1 }) public decimals!: number;

		/** Compute validation rules */
		public get finalRules() {
			const rules = [...this.rules];

			// add required rule
			if (this.isRequired) {
				rules.push((value: string | number) => (value !== '' || this.$text.all.requiredField));
			}

			// add min/max rule
			if (this.minValue !== '' && this.maxValue !== '') {
				rules.push((value: string | number) => {
					const valueNum: number = Number(value);
					if (valueNum < this.minValue || valueNum > this.maxValue) {
						const error: string = this.$text.fieldNumber.minMax;
						return error.replace('${1}', String(this.minValue)).replace('${2}', String(this.maxValue));
					}
					return true;
				});
			}
			else if (this.minValue !== '') {
				rules.push((value: string | number) => {
					const valueNum: number = Number(value);
					if (valueNum < this.minValue) {
						const error: string = this.$text.fieldNumber.min;
						return error.replace('${1}', String(this.minValue));
					}
					return true;
				});
			}
			else if (this.maxValue !== '') {
				rules.push((value: string | number) => {
					const valueNum: number = Number(value);
					if (valueNum > this.maxValue) {
						const error: string = this.$text.fieldNumber.max;
						return error.replace('${1}', String(this.maxValue));
					}
					return true;
				});
			}

			return rules;
		}

		/** Compute hint display for decimals */
		public get decimalsHint() {
			return (this.decimals > 0 ? `Decimals: #.${ '0'.repeat(this.decimals) }` : '');
		}

		/** Increment or decrement on click arrow buttons */
		public onClickArrow(direction: number) {
			if (!this.isReadonly) {
				// calculate new value
				const newValue: number = Number(this.value) + direction * this.valueStep;
				// apply
				this.$emit('input', newValue);
			}
		}

		/**
		 * Use input type=text to avoid label displacement bug.
		 * Block invalid characters on key down
		 */
		public onKeyDown(event: KeyboardEvent) {
			// check decimals
			if (event.key === '.' && this.decimals === 0) {
				event.preventDefault();
				return;
			}

			// increment / decrement by arrow
			if (event.key === 'ArrowUp') {
				this.onClickArrow(1);
				event.preventDefault();
				return;
			}
			if (event.key === 'ArrowDown') {
				this.onClickArrow(-1);
				event.preventDefault();
				return;
			}

			// check if special key
			if (!isSpecialKey(event)) {
				// @ts-ignore
				const pos = event.target.selectionStart;
				let newValue: string = insertInString(String(this.value), pos, event.key);
				// if key is dot, add a 0 to validate
				if (event.key === '.') {
					newValue += '0';
				}
				// check if new value is a number
				if (!numberRegex.test(newValue)) {
					event.preventDefault();
				}
			}
		}

		/** Limit number of decimals on keyup */
		public onKeyUp() {
			// ignore if string
			if (typeof this.value === 'string') {
				if (this.value === '' || this.value === '-' || this.value.slice(-1) === '.') {
					return;
				}
			}

			// check paste event
			const value: number = Number(this.value);
			if (isNaN(value)) {
				// update with 0
				this.$emit('input', 0);
			}
			else {
				// remove additional decimals
				if (this.decimals > -1) {
					const tens = 10 ** this.decimals;
					const newValue = Math.floor(Number(this.value) * tens) / tens;
					// update
					this.$emit('input', newValue);
				}
			}
		}

		/** Remove empty minus on blur */
		public onBlur() {
			// check if string
			if (typeof this.value === 'string') {
				if (this.value === '-') {
					// update
					this.$emit('input', '');
				}
				else if (this.value.slice(-1) === '.') {
					// update
					this.$emit('input', Number(this.value));
				}
			}
		}

	}
</script>


<template>
	<QInput
		@input="$emit('input', $event)"
		@keydown="onKeyDown"
		@keyup="onKeyUp"
		@blur="onBlur"
		:value="value"
		:label="finalLabel"
		:hint="hint"
		:placeholder="placeholder"
		:readonly="isReadonly"
		:bg-color="bgColor"
		:error-message="error"
		:error="error !== ''"
		:rules="finalRules"
		:disable="isDisabled"
		:class="{ 'y-field-number': true, 'y-form-control-spacing': hasSpacing }"
		:step="valueStep"
		:bottom-slots="decimals > 0"
		type="text"
		ref="qField"
		outlined
		lazy-rules
	>
		<template v-slot:append>
			<div class="y-field-number__control">
				<button
					@click="onClickArrow(1)"
					:class="['y-field-number__up', (isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')]"
					tabindex="-1"
				>
					<QIcon name="keyboard_arrow_up" color="grey-8"/>
					<QTooltip v-if="!isReadonly">+ {{ valueStep }}</QTooltip>
				</button>

				<button
					@click="onClickArrow(-1)"
					:class="['y-field-number__down', (isReadonly ? 'cursor-not-allowed' : 'cursor-pointer')]"
					tabindex="-1"
				>
					<QIcon name="keyboard_arrow_down" color="grey-8"/>
					<QTooltip v-if="!isReadonly">- {{ valueStep }}</QTooltip>
				</button>
			</div>
		</template>

		<template v-if="decimals > -1" v-slot:counter>
			{{ decimalsHint }}
		</template>
	</QInput>
</template>


<style scoped lang="scss">
	@import 'src/css/variables';

	.y-field-number__control {
		height: 100%;
		box-sizing: border-box;
		margin-right: -6px;
		display: flex;
		flex-direction: column;
		text-align: center;

		.y-field-number__down,
		.y-field-number__up {
			position: relative;
			width: 24px;
			height: 50%;
			box-sizing: border-box;
			overflow: hidden;
			outline: none;

			&.cursor-pointer:hover {
				background-color: $grey-3;
			}

			& > * {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
</style>

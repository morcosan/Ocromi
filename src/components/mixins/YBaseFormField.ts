/**
 * Used as the base for all text fields
 */

import { Mixins, Component, Prop, Watch } from 'vue-property-decorator';
import YBaseFormControl from 'src/components/mixins/YBaseFormControl';


@Component
export default class YBaseFormField extends Mixins(YBaseFormControl) {

	/** Content props */
	@Prop({ default: '' }) public placeholder!: string;
	@Prop({ default: '' }) public hint!: string;

	/** Feedback props */
	@Prop({ default: '' }) public error!: string;
	@Prop({ default: () => [] }) public rules!: Function[];

	/** Reset error if not required */
	@Watch('isRequired')
	public onChangeIsRequired(value: string, oldValue: string) {
		if (!this.isRequired) {
			// @ts-ignore
			this.$refs.qField.resetValidation();
		}
	}

	/** Compute field label */
	public get finalLabel() {
		return (this.isRequired ? (this.label + ' *') : this.label);
	}

	/**
	 * Compute validation rules
	 * Overwrite this getter to add additional rules
	 */
	public get finalRules() {
		return this.rules;
	}

	/** Validate the field */
	public validate() {
		// @ts-ignore
		return this.$refs.qField.validate();
	}

	/** Focus this control */
	public focus() {
		// @ts-ignore
		this.$refs.qField.focus();
	}
}

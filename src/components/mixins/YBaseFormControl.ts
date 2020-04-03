/**
 * Used as the base for all form controls
 */

import { Vue, Component, Prop } from 'vue-property-decorator';


@Component
export default class YBaseFormControl extends Vue {

	/** Content props */
	@Prop({ default: '' }) public label!: string;

	/** Config props */
	@Prop({ default: false, type: Boolean }) public isRequired!: boolean;
	@Prop({ default: false, type: Boolean }) public isDisabled!: boolean;
	@Prop({ default: false, type: Boolean }) public isReadonly!: boolean;
	@Prop({ default: false, type: Boolean }) public hasSpacing!: boolean;

	/** Special props */
	@Prop({ default: 'white' }) public bgColor!: string;

	/** Shortcut for localization */
	public get $text(): any {
		return this.$t('component');
	}

	/**
	 * Validate this form control
	 * Overwrite this for each type of form control
	 */
	public validate() {
		return true;
	}

	/**
	 * Focus this control
	 * Overwrite this for each type of form control
	 */
	public focus() {}
}

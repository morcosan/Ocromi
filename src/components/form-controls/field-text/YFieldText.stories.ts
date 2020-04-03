import YFieldText from './YFieldText.vue';
import { createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { formFieldProps } from '.storybook/story-utils/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
	components: {
		YFieldText,
	},
	props: formFieldProps,
	data() {
		return {
			value: '',
			value1: '',
		};
	},
};


const storyLines: StoryLine[] = [
	{
		title: 'Default',
		template: `
			<YFieldText
				v-model="value"
				:label="label"
				:placeholder="placeholder"
				:hint="hint"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
			/>
		`,
		states: ['value'],
	},
	{
		title: 'With rules (length < 5)',
		template: `
			<YFieldText
				v-model="value1"
				:label="label"
				:placeholder="placeholder"
				:hint="hint"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:rules="[val => (val.length < 5 || 'Value must have less than 5 characters')]"
				:error="error"
			/>
		`,
		states: ['value1'],
	},
];


export default {
	title: 'Form Controls / Fields / Field Text',
	decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

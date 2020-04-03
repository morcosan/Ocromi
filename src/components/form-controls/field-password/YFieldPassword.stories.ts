import YFieldPassword from './YFieldPassword.vue';
import { createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { formFieldProps } from '.storybook/story-utils/knob-props';
import { withKnobs, boolean } from '@storybook/addon-knobs';


const vue = {
	components: {
		YFieldPassword,
	},
	props: {
		...formFieldProps,
		hasMeter: {
			default: () => boolean('Has Meter', false),
		},
	},
	data() {
		return {
			value: '',
		};
	},
};


const storyLines: StoryLine[] = [
	{
		title: 'Default',
		template: `
			<YFieldPassword
				v-model="value"
				:label="label"
				:placeholder="placeholder"
				:hint="hint"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				:has-meter="hasMeter"
			/>
		`,
		states: ['value'],
	},
];


export default {
	title: 'Form Controls / Fields / Field Password',
	decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

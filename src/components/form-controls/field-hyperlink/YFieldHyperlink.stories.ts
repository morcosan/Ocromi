import YFieldHyperlink from './YFieldHyperlink.vue';
import { createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { formFieldProps } from '.storybook/story-utils/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
	components: {
		YFieldHyperlink,
	},
	props: formFieldProps,
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
			<YFieldHyperlink
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
];


export default {
	title: 'Form Controls / Fields / Field Hyperlink',
	decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

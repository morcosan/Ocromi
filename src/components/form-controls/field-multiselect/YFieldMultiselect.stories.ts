import YFieldMultiselect from './YFieldMultiselect.vue';
import { createStory, selectOptions, StoryLine } from '.storybook/story-utils/custom-story';
import { formSelectProps } from '.storybook/story-utils/knob-props';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';


const options = [...selectOptions];
for (let i = 0; i < 10; i += 1) {
	options.push({
		label: 'Other ' + i,
		value: 'other_' + i,
	});
}


const vue = {
	components: {
		YFieldMultiselect,
	},
	props: {
		...formSelectProps,
		selectionLimit: {
			default: () => number('Selection Limit', 0),
		},
		canAddNew: {
			default: () => boolean('Can Add New', false),
		},
	},
	data() {
		return {
			value: [],
			options,
		};
	},
};


const storyLines: StoryLine[] = [
	{
		title: 'Default',
		template: `
			<YFieldMultiselect
				v-model="value"
				:options="options"
				:label="label"
				:placeholder="placeholder"
				:hint="hint"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				:selection-limit="selectionLimit"
				:can-add-new="canAddNew"
			/>
		`,
		states: ['value'],
	},
];


export default {
	title: 'Form Controls / Fields / Field Multiselect',
	decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

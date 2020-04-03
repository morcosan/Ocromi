import YButton from './YButton.vue';
import { createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
	components: {
		YButton,
	},
	props: {},
	data() {
		return {
			value: [],
		};
	},
};


const storyLines: StoryLine[] = [
	{
		title: 'Default',
		template: `
			<YButton
				
			/>
		`,
		states: ['value'],
	},
];


export default {
	title: 'Buttons / Button',
	decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

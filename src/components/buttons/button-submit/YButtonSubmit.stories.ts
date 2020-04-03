import YButtonSubmit from './YButtonSubmit.vue';
import { createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { buttonProps } from '.storybook/story-utils/knob-props';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YButtonSubmit,
   },
   props: {
      ...buttonProps,
      isLoading: {
         default: () => boolean('Is Loading', false),
      },
      loadingTime: {
         default: () => number('Loading Time', 3000),
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
			<YButtonSubmit
				:label="label"
				:is-disabled="isDisabled"
				:is-loading="isLoading"
				:loading-time="loadingTime"
			/>
		`,
      states: [],
   },
];


export default {
   title: 'Buttons / Button Submit',
   decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

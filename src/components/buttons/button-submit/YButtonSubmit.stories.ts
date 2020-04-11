import YButtonSubmit from './YButtonSubmit.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsButton } from '.storybook/custom/knob-props';
import { boolean, number } from '@storybook/addon-knobs';


const vue = {
   components: {
      YButtonSubmit,
   },
   props: {
      ...propsButton,
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


export default StoryBuilder.createDefault('Buttons / Button Submit');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to take the submit action for certain data.
 */
`);

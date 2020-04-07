import YButton from './YButton.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
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
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to take an action.
 * This type of button is colored and draws attention.
 */
`);

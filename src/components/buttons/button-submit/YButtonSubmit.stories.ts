import YButtonSubmit from './YButtonSubmit.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsButton } from '.storybook/custom/knob-props';


const vue = {
   components: {
      YButtonSubmit,
   },
   props: propsButton,
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
            :spinner="spinner"
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

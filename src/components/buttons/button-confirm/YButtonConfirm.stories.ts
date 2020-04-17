import YButtonConfirm from './YButtonConfirm.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsButton } from '../../../../.storybook/custom/knob-props';


const vue = {
   components: {
      YButtonConfirm,
   },
   props: propsButton,
   methods: {
      onClick() {
         console.log('clicked');
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YButtonConfirm
            :label="label"
            :is-loading="isLoading"
            :is-disabled="isDisabled"
            :loading-time="loadingTime"
            :spinner="spinner"
            @click="onClick"
         />
      `,
   },
];


export default StoryBuilder.createDefault('Buttons / Button Confirm');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to take an action to continue the user flow.
 */
`);

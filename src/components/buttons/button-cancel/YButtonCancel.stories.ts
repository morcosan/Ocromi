import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsButton } from '../../../../.storybook/custom/knob-props';
import { text } from '@storybook/addon-knobs';
import YButtonCancel from './YButtonCancel.vue';
import YButtonConfirm from '../button-confirm/YButtonConfirm.vue';


const vue = {
   components: {
      YButtonCancel,
      YButtonConfirm,
   },
   props: {
      ...propsButton,
      isDisabled: undefined,
      label: {
         default: () => text('Label', 'Cancel'),
      },
   },
   methods: {
      onClick() {
         console.log('Clicked Cancel');
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YButtonCancel
            :label="label"
            @click="onClick"
         />
         
         <YButtonConfirm label="Confirm"/>
      `,
   },
];


export default StoryBuilder.createDefault('Buttons / Button Cancel');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to cancel the current flow.
 */
`);

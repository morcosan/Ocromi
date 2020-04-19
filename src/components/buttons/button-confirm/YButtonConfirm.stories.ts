import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsButtonLoading, settingsComputed } from '../../../../.storybook/custom/knob-props';
import { select, text } from '@storybook/addon-knobs';
import YButtonConfirm from './YButtonConfirm.vue';


const vue = {
   components: {
      YButtonConfirm,
   },
   props: {
      ...propsButtonLoading,
      label: {
         default: () => text('Label', 'Confirm', groupId),
      },
   },
   computed: settingsComputed,
   methods: {
      onClick() {
         console.log('Loading...');
         setTimeout(
            () => {
               console.log('Done');
            },
            // @ts-ignore
            this.loadingTime,
         );
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YButtonConfirm
            :label="label"
            :is-disabled="isDisabled"
            :loading-time="loadingTime"
            :settings="settings"
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

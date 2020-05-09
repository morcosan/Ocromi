import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsButtonLoading, settingsComputed } from '../../../../.storybook/custom/knob-props';
import { boolean, select } from '@storybook/addon-knobs';
import YButtonBack from './YButtonBack.vue';
import { BackIcon, ButtonStyle } from '../../../core/enums';


const vue = {
   components: {
      YButtonBack,
   },
   props: {
      ...propsButtonLoading,
      loadingTime: undefined,
      label: undefined,
      backIcon: {
         default: () => select('Back Icon', BackIcon, BackIcon.Android, groupId),
      },
      buttonStyle: {
         default: () => select('Button Style', ButtonStyle, ButtonStyle.Filled, groupId),
      },
      isSmall: {
         default: () => boolean('Is Small', false, groupId),
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
         <YButtonBack
            :label="label"
            :is-disabled="isDisabled"
            :back-icon="backIcon"
            :is-small="isSmall"
            :button-style="buttonStyle"
            :settings="settings"
            @click="onClick"
         />
      `,
   },
];


export default StoryBuilder.createDefault('Buttons / Button Back');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when the user can navigate back to previous screen / page.
 */
`);

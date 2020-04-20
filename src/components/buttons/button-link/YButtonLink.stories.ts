import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsButton, settingsComputed } from '../../../../.storybook/custom/knob-props';
import { select, text } from '@storybook/addon-knobs';
import YButtonLink from './YButtonLink.vue';
import { ButtonStyle } from '../../../core/enums';


const vue = {
   components: {
      YButtonLink,
   },
   props: {
      ...propsButton,
      label: {
         default: () => text('Label', 'Go to google.com', groupId),
      },
      url: {
         default: () => text('URL', 'https://google.com', groupId),
      },
      buttonStyle: {
         default: () => select('Button Style', ButtonStyle, ButtonStyle.Filled, groupId),
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
         <YButtonLink
            :label="label"
            :is-disabled="isDisabled"
            :url="url"
            :button-style="buttonStyle"
            :settings="settings"
            @click="onClick"
         />
      `,
   },
];


export default StoryBuilder.createDefault('Buttons / Button Link');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to navigate to a different url.
 */
`);

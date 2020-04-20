import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsButtonLoading, settingsComputed } from '../../../../.storybook/custom/knob-props';
import { select, text } from '@storybook/addon-knobs';
import YButtonIcon from './YButtonIcon.vue';
import { ButtonStyle, IconSize } from '../../../core/enums';


const vue = {
   components: {
      YButtonIcon,
   },
   props: {
      ...propsButtonLoading,
      label: undefined,
      iconId: {
         default: () => text('Icon Id', 'favorite', groupId),
      },
      iconSize: {
         default: () => select('Icon Size', IconSize, IconSize.Medium, groupId),
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
         <YButtonIcon
            :is-disabled="isDisabled"
            :loading-time="loadingTime"
            :icon-id="iconId"
            :icon-size="iconSize"
            :button-style="buttonStyle"
            :settings="settings"
            @click="onClick"
         />
      `,
   },
];


export default StoryBuilder.createDefault('Buttons / Button Icon');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when buttons need to be subtle or displayed in a toolbar.
 */
`);

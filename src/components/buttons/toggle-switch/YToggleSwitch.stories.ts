import YToggleSwitch from './YToggleSwitch.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsButton, settingsComputed } from '.storybook/custom/knob-props';
import { boolean, select, text } from '@storybook/addon-knobs';
import { DuoStyle, ToggleSize } from '../../../core/enums';


const vue = {
   components: {
      YToggleSwitch,
   },
   props: {
      ...propsButton,
      label: {
         default: () => text('Label', 'Nice toggle', groupId),
      },
      labelOnRight: {
         default: () => text('Label On Right', '', groupId),
      },
      iconIdTrue: {
         default: () => text('Icon Id True', 'done', groupId),
      },
      iconIdFalse: {
         default: () => text('Icon Id False', '', groupId),
      },
      size: {
         default: () => select('Size', ToggleSize, ToggleSize.Medium, groupId),
      },
   },
   data() {
      return {
         value: false,
      };
   },
   computed: settingsComputed,
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YToggleSwitch
            v-model="value"
            :label="label"
            :label-on-right="labelOnRight"
            :icon-id-true="iconIdTrue"
            :icon-id-false="iconIdFalse"
            :is-disabled="isDisabled"
            :size="size"
            :settings="settings"
         />
      `,
      states: ['value'],
   },
];


export default StoryBuilder.createDefault('Buttons / Toggle Switch');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to change the state (on/off) of a system.
 */
`);

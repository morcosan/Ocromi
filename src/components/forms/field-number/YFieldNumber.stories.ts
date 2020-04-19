import YFieldNumber from './YFieldNumber.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsInputField, settingsComputed } from '.storybook/custom/knob-props';
import { number } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldNumber,
   },
   props: {
      ...propsInputField,
      minValue: {
         default: () => number('Min Value', 0, {}, groupId),
      },
      maxValue: {
         default: () => number('Max Value', 100, {}, groupId),
      },
      valueStep: {
         default: () => number('Value Step', 1, {}, groupId),
      },
      decimals: {
         default: () => number('Decimals', 3, {}, groupId),
      },
   },
   data() {
      return {
         value: '',
      };
   },
   computed: settingsComputed,
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YFieldNumber
            v-model="value"
            :label="label"
            :placeholder="placeholder"
            :hint="hint"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :error="error"
            :min-value="minValue"
            :max-value="maxValue"
            :value-step="valueStep"
            :decimals="decimals"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
         />
      `,
      states: ['value'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Field Number');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to enter numeric values (even with decimals).
 */
`);

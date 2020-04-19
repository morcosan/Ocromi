import YFieldCipher from './YFieldCipher.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsInputField } from '.storybook/custom/knob-props';
import { text } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldCipher,
   },
   props: {
      ...propsInputField,
      inputMask: {
         default: () => text('Input Mask', '####  ####  ####  ####', groupId),
      },
   },
   data() {
      return {
         value: '',
      };
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YFieldCipher
            v-model="value"
            :input-mask="inputMask"
            :label="label"
            :placeholder="placeholder"
            :hint="hint"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :error="error"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
         />
      `,
      states: ['value'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Field Cipher');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to enter a code number or similar.
 * Mask rules (from Quasar):
 *   # - Numeric
 *   S - Letter, a to z, case insensitive
 *   A - Letter, transformed to uppercase
 *   a - Letter, transformed to lowercase
 *   N - Alphanumeric, case insensitive for letters
 *   X - Alphanumeric, transformed to uppercase for letters
 *   x - Alphanumeric, transformed to lowercase for letters
 */
`);

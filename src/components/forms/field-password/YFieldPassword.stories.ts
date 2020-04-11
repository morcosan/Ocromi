import YFieldPassword from './YFieldPassword.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputField } from '.storybook/custom/knob-props';
import { boolean } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldPassword,
   },
   props: {
      ...propsInputField,
      hasMeter: {
         default: () => boolean('Has Meter', false),
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
         <YFieldPassword
            v-model="value"
            :label="label"
            :placeholder="placeholder"
            :hint="hint"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :error="error"
            :has-meter="hasMeter"
         />
      `,
      states: ['value'],
   },
];


export default StoryBuilder.createDefault('Forms / Fields / Field Password');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when the user must enter a custom password.
 */
`);

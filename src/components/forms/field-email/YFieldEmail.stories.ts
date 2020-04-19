import YFieldEmail from './YFieldEmail.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputField, settingsComputed } from '.storybook/custom/knob-props';


const vue = {
   components: {
      YFieldEmail,
   },
   props: propsInputField,
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
         <YFieldEmail
            v-model="value"
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


export default StoryBuilder.createDefault('Forms / Inputs / Field Email');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used for asking user email address
 */
`);

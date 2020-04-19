import YFieldTextArea from './YFieldTextArea.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsInputField } from '.storybook/custom/knob-props';
import { boolean } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldTextArea,
   },
   props: {
      ...propsInputField,
      isDynamic: {
         default: () => boolean('Is Dynamic', false, groupId),
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
         <YFieldTextArea
            v-model="value"
            :label="label"
            :placeholder="placeholder"
            :hint="hint"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :error="error"
            :is-dynamic="isDynamic"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
         />
      `,
      states: ['value'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Field Text Area');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to enter multiple lines of text.
 */
`);

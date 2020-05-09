import YCheckbox from './YCheckbox.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { groupId, propsInput, settingsComputed } from '.storybook/custom/knob-props';
import { text } from '@storybook/addon-knobs';


const vue = {
   components: {
      YCheckbox,
   },
   props: {
      ...propsInput,
      isMini: undefined,
      error: {
         default: () => text('Error', 'Custom error message', groupId),
      },
   },
   computed: settingsComputed,
   data() {
      return {
         value: false,
         value1: false,
         value2: null,
      };
   },
   methods: {
      onClick(event: Event) {
         console.log('Clicked link');
         event.preventDefault();
         event.stopPropagation();
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YCheckbox
            v-model="value"
            :label="label"
            :is-disabled="isDisabled"
            :is-readonly="isReadonly"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :error="error"
            :side-label-width="sideLabelWidth"
         />
      `,
      states: ['value'],
   },
   {
      title: 'Custom label',
      template: `
         <YCheckbox
            v-model="value1"
            :is-disabled="isDisabled"
            :is-readonly="isReadonly"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :error="error"
            :side-label-width="sideLabelWidth"
         >
            I agree with <a href="/" @click="onClick">terms of service</a>
         </YCheckbox>
      `,
      states: ['value1'],
   },
   {
      title: 'Indeterminate',
      template: `
         <YCheckbox
            v-model="value2"
            :label="label"
            :is-disabled="isDisabled"
            :is-readonly="isReadonly"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :error="error"
            :side-label-width="sideLabelWidth"
         />
      `,
      states: ['value2 === null ? "null" : value2'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Checkbox');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used inside forms (but not only) when the options are true / false
 */
`);

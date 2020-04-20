import YFieldDate from './YFieldDate.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputField, settingsComputed } from '.storybook/custom/knob-props';


const vue = {
   components: {
      YFieldDate,
   },
   props: {
      ...propsInputField,
      placeholder: undefined,
      hint: undefined,
   },
   data() {
      return {
         value: '',
         value1: '',
      };
   },
   computed: settingsComputed,
   methods: {
      customDates(date: string) {
         return (date >= '2020-04-19' && date <= '2020-05-03');
      },
   },
};

const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YFieldDate
            v-model="value"
            :label="label"
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
   {
      title: 'Custom dates',
      template: `
         <YFieldDate
            v-model="value1"
            :label="label"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :error="error"
            :custom-dates-fn="customDates"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
         />
      `,
      states: ['value1'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Field Date');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to select a date.
 */
`);

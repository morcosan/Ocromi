import YFieldDate from './YFieldDate.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputField } from '.storybook/custom/knob-props';


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
   methods: {
      customDates(date: string) {
         return (date >= '2020-03-19' && date <= '2020-04-03');
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
         />
      `,
      states: ['value1'],
   },
];


export default StoryBuilder.createDefault('Forms / Fields / Field Date');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to select a date.
 */
`);

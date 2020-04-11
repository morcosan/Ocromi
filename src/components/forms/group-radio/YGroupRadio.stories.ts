import YGroupRadio from './YGroupRadio.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputGroup } from '.storybook/custom/knob-props';


const options = [
   {
      value: 'male',
      label: 'Male',
   },
   {
      value: 'female',
      label: 'Female',
   },
   {
      value: 'other',
      label: 'Other',
   },
];

const vue = {
   components: {
      YGroupRadio,
   },
   props: propsInputGroup,
   data() {
      return {
         value: null,
         options,
      };
   },
   methods: {
      onClick() {
         // @ts-ignore
         this.$refs.groupRadio.validate();
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
         <YGroupRadio
            v-model="value"
            :options="options"
            :label="label"
            :is-disabled="isDisabled"
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            ref="groupRadio"
         />
         <br/>
         <button class="story-button" @click="onClick">Validate</button>
      `,
      states: ['value'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Group Radio');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to select one option from no more than 5.
 * If more than 5 options are required, use a select field instead.
 */
`);

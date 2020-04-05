import YFieldDate from './YFieldDate.vue';
import { createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { formFieldProps } from '.storybook/story-utils/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldDate,
   },
   props: {
      ...formFieldProps,
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
				:is-required="isRequired"
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
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				:custom-dates-fn="customDates"
			/>
		`,
      states: ['value1'],
   },
];


export default {
   title: 'Forms / Fields / Field Date',
   decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

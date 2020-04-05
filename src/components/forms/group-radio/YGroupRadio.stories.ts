import YGroupRadio from './YGroupRadio.vue';
import { createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { formGroupProps } from '.storybook/story-utils/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


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
   props: formGroupProps,
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
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				ref="groupRadio"
			/>
			<br/>
			<button class="story-button" @click="onClick">Validate</button>
		`,
      states: ['value'],
   },
];


export default {
   title: 'Forms / Other / Group Radio',
   decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

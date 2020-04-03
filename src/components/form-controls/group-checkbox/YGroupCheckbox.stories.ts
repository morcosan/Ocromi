import YGroupCheckbox from './YGroupCheckbox.vue';
import { createStory, selectOptions, StoryLine } from '.storybook/story-utils/custom-story';
import { formGroupProps } from '.storybook/story-utils/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YGroupCheckbox,
   },
   props: formGroupProps,
   data() {
      return {
         value: [],
         options: selectOptions.splice(0, 4),
      };
   },
   methods: {
      onClick() {
         // @ts-ignore
         this.$refs.groupCheckbox.validate();
      },
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
			<YGroupCheckbox
				v-model="value"
				:options="options"
				:label="label"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				ref="groupCheckbox"
			/>
			<br/>
			<button class="story-button" @click="onClick">Validate</button>
		`,
      states: ['value'],
   },
];


export default {
   title: 'Form Controls / Other / Group Checkbox',
   decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

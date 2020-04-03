import YFieldEmail from './YFieldEmail.vue';
import { createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { formFieldProps } from '.storybook/story-utils/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldEmail,
   },
   props: formFieldProps,
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
			<YFieldEmail
				v-model="value"
				:label="label"
				:placeholder="placeholder"
				:hint="hint"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
			/>
		`,
      states: ['value'],
   },
];


export default {
   title: 'Form Controls / Fields / Field Email',
   decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

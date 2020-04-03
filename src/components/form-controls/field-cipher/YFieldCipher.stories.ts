import YFieldCipher from './YFieldCipher.vue';
import { createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { formFieldProps } from '.storybook/story-utils/knob-props';
import { text, withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldCipher,
   },
   props: {
      ...formFieldProps,
      inputMask: {
         default: () => text('Input Mask', '####  ####  ####  ####'),
         // Mask rules (from Quasar):
         //   # - Numeric
         //   S - Letter, a to z, case insensitive
         //   A - Letter, transformed to uppercase
         //   a - Letter, transformed to lowercase
         //   N - Alphanumeric, case insensitive for letters
         //   X - Alphanumeric, transformed to uppercase for letters
         //   x - Alphanumeric, transformed to lowercase for letters
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
			<YFieldCipher
				v-model="value"
				:input-mask="inputMask"
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
   title: 'Form Controls / Fields / Field Cipher',
   decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);

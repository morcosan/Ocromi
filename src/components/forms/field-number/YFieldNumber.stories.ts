import YFieldNumber from './YFieldNumber.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { propsInputField } from '.storybook/custom/knob-props';
import { number, withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldNumber,
   },
   props: {
      ...propsInputField,
      minValue: {
         default: () => number('Min Value', 0),
      },
      maxValue: {
         default: () => number('Max Value', 100),
      },
      valueStep: {
         default: () => number('Value Step', 1),
      },
      decimals: {
         default: () => number('Decimals', 3),
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
			<YFieldNumber
				v-model="value"
				:label="label"
				:placeholder="placeholder"
				:hint="hint"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				:min-value="minValue"
				:max-value="maxValue"
				:value-step="valueStep"
				:decimals="decimals"
			/>
		`,
      states: ['value'],
   },
];


export default {
   title: 'Forms / Fields / Field Number',
   decorators: [withKnobs],
};
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when user needs to enter numeric values (even with decimals).
 */
`);

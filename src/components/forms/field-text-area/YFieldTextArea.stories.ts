import YFieldTextArea from './YFieldTextArea.vue';
import { createDocs, createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { formFieldProps } from '.storybook/story-utils/knob-props';
import { boolean, withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldTextArea,
   },
   props: {
      ...formFieldProps,
      isDynamic: {
         default: () => boolean('Is Dynamic', false),
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
			<YFieldTextArea
				v-model="value"
				:label="label"
				:placeholder="placeholder"
				:hint="hint"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				:is-dynamic="isDynamic"
			/>
		`,
      states: ['value'],
   },
];


export default {
   title: 'Forms / Fields / Field Text Area',
   decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);
export const docs = createDocs(`

`);

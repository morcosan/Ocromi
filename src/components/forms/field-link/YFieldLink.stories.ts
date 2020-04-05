import YFieldLink from './YFieldLink.vue';
import { createDocs, createStory, StoryLine } from '.storybook/story-utils/custom-story';
import { formFieldProps } from '.storybook/story-utils/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldLink,
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
			<YFieldLink
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
   title: 'Forms / Fields / Field Link',
   decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);
export const docs = createDocs(`

`);

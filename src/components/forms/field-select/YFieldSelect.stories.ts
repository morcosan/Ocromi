import YFieldSelect from './YFieldSelect.vue';
import { createDocs, createStory, selectOptions, StoryLine } from '.storybook/story-utils/custom-story';
import { formSelectProps } from '.storybook/story-utils/knob-props';
import { withKnobs } from '@storybook/addon-knobs';


const vue = {
   components: {
      YFieldSelect,
   },
   props: formSelectProps,
   data() {
      return {
         value: null,
         options: selectOptions,
      };
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
			<YFieldSelect
				v-model="value"
				:options="options"
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
   title: 'Forms / Fields / Field Select',
   decorators: [withKnobs],
};
export const default_ = createStory(vue, storyLines);
export const docs = createDocs(`
/**
 * Used when there are 5 or more options for the user to choose from.
 */
`);

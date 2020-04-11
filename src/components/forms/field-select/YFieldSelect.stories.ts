import YFieldSelect from './YFieldSelect.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { selectOptions } from '.storybook/custom/utils';
import { propsInputSelect } from '.storybook/custom/knob-props';


const vue = {
   components: {
      YFieldSelect,
   },
   props: propsInputSelect,
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
				:is-optional="isOptional"
				:hides-optional="hidesOptional"
				:is-readonly="isReadonly"
				:error="error"
			/>
		`,
      states: ['value'],
   },
];


export default StoryBuilder.createDefault('Forms / Fields / Field Select');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when there are 5 or more options for the user to choose from.
 */
`);

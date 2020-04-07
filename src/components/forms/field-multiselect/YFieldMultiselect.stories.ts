import YFieldMultiselect from './YFieldMultiselect.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { selectOptions } from '.storybook/custom/utils';
import { propsInputSelect } from '.storybook/custom/knob-props';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';


const options = [...selectOptions];
for (let i = 0; i < 10; i += 1) {
   options.push({
      label: 'Other ' + i,
      value: 'other_' + i,
   });
}


const vue = {
   components: {
      YFieldMultiselect,
   },
   props: {
      ...propsInputSelect,
      selectionLimit: {
         default: () => number('Selection Limit', 0),
      },
      canAddNew: {
         default: () => boolean('Can Add New', false),
      },
   },
   data() {
      return {
         value: [],
         options,
      };
   },
};


const storyLines: StoryLine[] = [
   {
      title: 'Default',
      template: `
			<YFieldMultiselect
				v-model="value"
				:options="options"
				:label="label"
				:hint="hint"
				:is-disabled="isDisabled"
				:is-required="isRequired"
				:is-readonly="isReadonly"
				:error="error"
				:selection-limit="selectionLimit"
				:can-add-new="canAddNew"
			/>
		`,
      states: ['value'],
   },
];


export default {
   title: 'Forms / Fields / Field Multiselect',
   decorators: [withKnobs],
};
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when the user needs to choose multiple options from a list.
 */
`);

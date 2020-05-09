import YFieldMultiselect from './YFieldMultiselect.vue';
import StoryBuilder, { StoryLine } from '.storybook/custom/story-builder';
import { selectOptions } from '.storybook/custom/utils';
import { groupId, propsInputSelect, settingsComputed } from '.storybook/custom/knob-props';
import { boolean, number } from '@storybook/addon-knobs';


const options = [...selectOptions];
for (let i = 0; i < 10; i++) {
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
         default: () => number('Selection Limit', 0, {}, groupId),
      },
      canAddNew: {
         default: () => boolean('Can Add New', false, groupId),
      },
   },
   data() {
      return {
         value: [],
         options,
      };
   },
   computed: settingsComputed,
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
            :is-optional="isOptional"
            :hides-optional="hidesOptional"
            :is-readonly="isReadonly"
            :error="error"
            :selection-limit="selectionLimit"
            :can-add-new="canAddNew"
            :is-mini="isMini"
            :side-label-width="sideLabelWidth"
         />
      `,
      states: ['value'],
   },
];


export default StoryBuilder.createDefault('Forms / Inputs / Field Multiselect');
export const default_ = StoryBuilder.createStory(vue, storyLines);
export const docs = StoryBuilder.createDocs(`
/**
 * Used when the user needs to choose multiple options from a list.
 */
`);
